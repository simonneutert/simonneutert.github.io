---
title: Speed up Vulkan Shader Compilation on Bazzite
layout: post
---

Steam can take ages to precompile the shaders for Vulkan?

Hard to find, easy to implement:

```
nvim .local/share/Steam/steam_dev.cfg
```

and edit/add those two lines:

```
@ShaderBackgroundProcessingThreads 8
unShaderBackgroundProcessingThreads 8
```

Make sure to adjust, the 8 is fine in my case. The number represents the numbers of CPU cores Vulkan can use.
