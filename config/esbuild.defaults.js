// This file is created and managed by Bridgetown.
// Instead of editing this file, add your overrides to `esbuild.config.js`
//
// To update this file to the latest version provided by Bridgetown,
// run `bridgetown esbuild update`. Any changes to this file will be overwritten
// when an update is applied hence we strongly recommend adding overrides to
// `esbuild.config.js` instead of editing this file.
//
// Shipped with Bridgetown v1.3.1

// DO NOT MANUALLY EDIT THIS CONFIGURATION:
const autogeneratedBridgetownConfig = {
  "source": "src",
  "destination": "output",
  "componentsDir": "_components",
  "islandsDir": "_islands"
};

const path = require("path");
const fsLib = require("fs");
const fs = fsLib.promises;
const { pathToFileURL, fileURLToPath } = require("url");
const glob = require("glob");
const postcss = require("postcss");
const postCssImport = require("postcss-import");
const readCache = require("read-cache");

// Detect if an NPM package is available
const moduleAvailable = (name) => {
  try {
    require.resolve(name);
    return true;
  } catch (e) {}
  return false;
};

// Generate a Source Map URL (used by the Sass plugin)
const generateSourceMappingURL = (sourceMap) => {
  const data = Buffer.from(JSON.stringify(sourceMap), "utf-8").toString(
    "base64"
  );
  return `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${data} */`;
};

// Import Sass if available
let sass;
if (moduleAvailable("sass")) {
  sass = require("sass");
}

// Glob plugin derived from:
// https://github.com/thomaschaaf/esbuild-plugin-import-glob
// https://github.com/xiaohui-zhangxh/jsbundling-rails/commit/b15025dcc20f664b2b0eb238915991afdbc7cb58
const importGlobPlugin = (options, bridgetownConfig) => ({
  name: "import-glob",
  setup: (build) => {
    build.onResolve({ filter: /\*/ }, async (args) => {
      if (args.resolveDir === "") {
        return; // Ignore unresolvable paths
      }

      const adjustedPath = args.path
        .replace(
          /^\$components\/\*\*/,
          `../../${bridgetownConfig.source}/${bridgetownConfig.componentsDir}/**`
        )
        .replace(
          /^$components\//,
          `../../${bridgetownConfig.source}/${bridgetownConfig.componentsDir}/`
        ); // legacy

      return {
        path: adjustedPath,
        namespace: "import-glob",
        pluginData: {
          path: adjustedPath,
          resolveDir: args.resolveDir,
        },
      };
    });

    build.onLoad({ filter: /.*/, namespace: "import-glob" }, async (args) => {
      const files = glob
        .sync(args.pluginData.path, {
          cwd: args.pluginData.resolveDir,
        })
        .filter((module) =>
          options.excludeFilter ? !options.excludeFilter.test(module) : true
        )
        .sort()
        .map((module) =>
          module.replace(
            `../../${bridgetownConfig.source}/${bridgetownConfig.componentsDir}/`,
            "$components/"
          )
        )
        .map((module) =>
          module.match(/^[a-zA-Z0-9]/) ? `./${module}` : module
        );

      const importerCode = `
        ${files
          .map((module, index) => `import * as module${index} from '${module}'`)
          .join(";")}
        const modules = {${files
          .map(
            (module, index) => `
            "${module.replace("$components/", "")}": module${index},`
          )
          .join("")}
        };
        export default modules;
      `;

      return { contents: importerCode, resolveDir: args.pluginData.resolveDir };
    });
  },
});

// Plugin for PostCSS
const importPostCssPlugin = (options, configuration) => ({
  name: "postcss",
  async setup(build) {
    // Process .css files with PostCSS
    build.onLoad({ filter: configuration.filter || /\.css$/ }, async (args) => {
      if (args.path.endsWith(".lit.css")) return;

      const additionalFilePaths = [];
      const css = await fs.readFile(args.path, "utf8");

      // Configure import plugin so PostCSS can properly resolve `@import`ed CSS files
      const importPlugin = postCssImport({
        filter: (itemPath) => !itemPath.startsWith("/"), // ensure it doesn't try to import source-relative paths
        load: async (filename) => {
          let contents = await readCache(filename, "utf-8");
          const filedir = path.dirname(filename);
          // We'll want to track any imports later when in watch mode:
          additionalFilePaths.push(filename);

          // We need to transform `url(...)` in imported CSS so the filepaths are properly
          // relative to the entrypoint. Seems icky to have to hack this! C'est la vie...
          contents = contents.replace(
            /url\(['"]?\.\/(.*?)['"]?\)/g,
            (_match, p1) => {
              const relpath = path
                .relative(args.path, path.resolve(filedir, p1))
                .replace(/^\.\.\//, "");
              return `url("${relpath}")`;
            }
          );
          return contents;
        },
      });

      // Process the file through PostCSS
      const result = await postcss([importPlugin, ...options.plugins]).process(
        css,
        {
          map: true,
          ...options.options,
          from: args.path,
        }
      );

      return {
        contents: result.css,
        loader: "css",
        watchFiles: [args.path, ...additionalFilePaths],
      };
    });
  },
});

// Plugin for Sass
const sassPlugin = (options) => ({
  name: "sass",
  async setup(build) {
    // Process .scss and .sass files with Sass
    build.onLoad({ filter: /\.(sass|scss)$/ }, async (args) => {
      if (!sass) {
        console.error(
          "error: Sass is not installed. Try running `yarn add sass` and then building again."
        );
        return;
      }

      const modulesFolder = pathToFileURL("node_modules/");

      const localOptions = {
        importers: [
          {
            // An importer that redirects relative URLs starting with "~" to
            // `node_modules`.
            findFileUrl(url) {
              if (!url.startsWith("~")) return null;
              return new URL(url.substring(1), modulesFolder);
            },
          },
        ],
        sourceMap: true,
        ...options,
      };
      const result = sass.compile(args.path, localOptions);

      const watchPaths = result.loadedUrls
        .filter(
          (x) =>
            x.protocol === "file:" &&
            !x.pathname.startsWith(modulesFolder.pathname)
        )
        .map((x) => x.pathname);

      let cssOutput = result.css.toString();

      if (result.sourceMap) {
        const basedir = process.cwd();
        const sourceMap = result.sourceMap;

        const promises = sourceMap.sources.map(async (source) => {
          const sourceFile = await fs.readFile(fileURLToPath(source), "utf8");
          return sourceFile;
        });
        sourceMap.sourcesContent = await Promise.all(promises);

        sourceMap.sources = sourceMap.sources.map((source) => {
          return path.relative(basedir, fileURLToPath(source));
        });

        cssOutput += "\n" + generateSourceMappingURL(sourceMap);
      }

      return {
        contents: cssOutput,
        loader: "css",
        watchFiles: [args.path, ...watchPaths],
      };
    });
  },
});

// Set up defaults and generate frontend bundling manifest file
const bridgetownPreset = (bridgetownConfig) => ({
  name: "bridgetownPreset",
  async setup(build) {
    // Ensure any imports anywhere starting with `/` are left verbatim
    // so they can be used in-browser for actual `src` repo files
    build.onResolve({ filter: /^\// }, (args) => {
      return { path: args.path, external: true };
    });

    build.onStart(() => {
      console.log("esbuild: frontend bundling started...");
    });

    // Generate the final output manifest
    build.onEnd(async (result) => {
      if (!result.metafile) {
        console.warn("esbuild: build process error, cannot write manifest");
        return;
      }

      const manifest = {};
      const entrypoints = [];

      // Clean up entrypoint naming
      const stripPrefix = (str) =>
        str
          .replace(/^frontend\//, "")
          .replace(
            RegExp(
              String.raw`^${bridgetownConfig.source}\/${bridgetownConfig.islandsDir}\/`
            ),
            "islands/"
          );

      // For calculating the file size of bundle output
      const fileSize = (path) => {
        const { size } = fsLib.statSync(path);
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return (
          (size / Math.pow(1024, i)).toFixed(2) * 1 +
          ["B", "KB", "MB", "GB", "TB"][i]
        );
      };

      const pathShortener = new RegExp(
        String.raw`^${bridgetownConfig.destination}\/_bridgetown\/static\/`,
        "g"
      );

      // Let's loop through all the various outputs
      for (const key in result.metafile.outputs) {
        const value = result.metafile.outputs[key];
        const inputs = Object.keys(value.inputs);
        const outputPath = key.replace(pathShortener, "");

        if (value.entryPoint) {
          // We have an entrypoint!
          manifest[stripPrefix(value.entryPoint)] = outputPath;
          entrypoints.push([outputPath, fileSize(key)]);
        } else if (
          key.match(/index(\.js)?\.[^-.]*\.css/) &&
          inputs.find((item) => item.match(/frontend.*\.(s?css|sass)$/))
        ) {
          // Special treatment for index.css
          const input = inputs.find((item) =>
            item.match(/frontend.*\.(s?css|sass)$/)
          );
          manifest[stripPrefix(input)] = outputPath;
          entrypoints.push([outputPath, fileSize(key)]);
        } else if (inputs.length > 0) {
          // Naive implementation, we'll just grab the first input and hope it's accurate
          manifest[stripPrefix(inputs[0])] = outputPath;
        }
      }

      const manifestFolder = path.join(
        process.cwd(),
        ".bridgetown-cache",
        "frontend-bundling"
      );
      await fs.mkdir(manifestFolder, { recursive: true });
      await fs.writeFile(
        path.join(manifestFolder, "manifest.json"),
        JSON.stringify(manifest)
      );

      console.log("esbuild: frontend bundling complete!");
      console.log("esbuild: entrypoints processed:");
      entrypoints.forEach((entrypoint) => {
        const [entrypointName, entrypointSize] = entrypoint;
        console.log(`         - ${entrypointName}: ${entrypointSize}`);
      });
    });
  },
});

const bridgetownConfigured = (bridgetownConfig, outputFolder) => {
  bridgetownConfig = { ...autogeneratedBridgetownConfig, ...bridgetownConfig };
  if (outputFolder) bridgetownConfig.destination = outputFolder;

  return bridgetownConfig;
};

// Load the PostCSS config from postcss.config.js or whatever else is a supported location/format
const postcssrc = require("postcss-load-config");

module.exports = async (esbuildOptions, ...args) => {
  let outputFolder;
  if (typeof esbuildOptions === "string") {
    // legacy syntax where first argument is output folder
    outputFolder = esbuildOptions;
    esbuildOptions = args[0];
  }
  const bridgetownConfig = bridgetownConfigured(
    esbuildOptions.bridgetownConfig,
    outputFolder
  );

  esbuildOptions.plugins = esbuildOptions.plugins || [];
  // Add the PostCSS & glob plugins to the top of the plugin stack
  const postCssConfig = await postcssrc();
  esbuildOptions.plugins.unshift(
    importPostCssPlugin(postCssConfig, esbuildOptions.postCssPluginConfig || {})
  );
  if (esbuildOptions.postCssPluginConfig)
    delete esbuildOptions.postCssPluginConfig;
  // Add the Glob plugin
  esbuildOptions.plugins.unshift(
    importGlobPlugin(esbuildOptions.globOptions || {}, bridgetownConfig)
  );
  if (esbuildOptions.globOptions) delete esbuildOptions.globOptions;
  // Add the Sass plugin
  esbuildOptions.plugins.push(sassPlugin(esbuildOptions.sassOptions || {}));
  if (esbuildOptions.sassOptions) delete esbuildOptions.sassOptions;
  // Add the Bridgetown preset
  esbuildOptions.plugins.push(bridgetownPreset(bridgetownConfig));
  if (esbuildOptions.bridgetownConfig) delete esbuildOptions.bridgetownConfig;

  const esbuild = require("esbuild");
  const entryPoints = esbuildOptions.entryPoints || [
    "./frontend/javascript/index.js",
  ];
  if (esbuildOptions.entryPoints) delete esbuildOptions.entryPoints;

  const islands = glob
    .sync(
      `./${bridgetownConfig.source}/${bridgetownConfig.islandsDir}/*.{js,js.rb}`
    )
    .map((item) => `./${item}`);

  esbuild
    .context({
      bundle: true,
      loader: {
        ".jpg": "file",
        ".png": "file",
        ".gif": "file",
        ".svg": "file",
        ".woff": "file",
        ".woff2": "file",
        ".ttf": "file",
        ".eot": "file",
      },
      resolveExtensions: [
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".css",
        ".scss",
        ".sass",
        ".json",
        ".js.rb",
      ],
      minify: process.argv.includes("--minify"),
      sourcemap: true,
      target: "es2020",
      entryPoints: [...entryPoints, ...islands],
      entryNames: "[dir]/[name].[hash]",
      outdir: path.join(
        process.cwd(),
        `${bridgetownConfig.destination}/_bridgetown/static`
      ),
      publicPath: "/_bridgetown/static",
      metafile: true,
      ...esbuildOptions,
    })
    .then((context) => {
      if (process.argv.includes("--watch")) {
        // Enable watch mode
        context.watch();
      } else {
        // Build once and exit if not in watch mode
        context.rebuild().then((result) => {
          context.dispose();
        });
      }
      process.on("SIGINT", () => process.exit());
    })
    .catch(() => process.exit(1));
};
