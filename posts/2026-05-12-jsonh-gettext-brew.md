---
title: Fixing json.h in gettext v1.0.0 with Homebrew
layout: post
---

First of all, here's the link to the discussion on GitHub:
[gettext 1.0 build fails from source when json-c is present #6693](https://github.com/orgs/Homebrew/discussions/6693).

I decided to go with this proposed solution.

## brew doctor

First, please run `brew doctor` to check for any issues with your Homebrew
installation.

I had to add a path to my fish shell configuration to ensure that Homebrew's
sbin directory is included in my PATH.

`brew doctor` will guide you a little in the right direction if there are any
issues.

## brew edit

Next, I ran `brew edit gettext` to open the formula in my default text editor.

(You may need to edit $EDITOR environment variable if your default editor is
broken due to gettext's json.h conflict. In my case vscode opened the file,
because $EDITOR was not set at all, but YMMVV.)

> Proposed Solutions Option A: Explicitly support the C version of spit
> (recommended for feature completeness)
>
> ```
> depends_on "json-c"
>
> # In the install method:
> ENV.append "CPPFLAGS", "-I#{Formula["json-c"].opt_include}/json-c"
> ENV.append "LDFLAGS", "-L#{Formula["json-c"].opt_lib}"
> ```

After editing the formula, I saved the file and closed the editor.

## Installing the Patched Formula

After editing the formula, brew will render some warnings and hints.

Closed all terminals, started fresh and ran the following command to install
gettext from source with the new changes:

```sh
HOMEBREW_NO_INSTALL_FROM_API=1 brew install --build-from-source --verbose --debug gettext
```

## Verification

After the installation is complete, I was able to run my brew update and upgrade
commands without any issues.

## Thanks

Big thanks to [@OldCrow](https://github.com/OldCrow), without whom I would not
have been able to fix this issue. ❤️
