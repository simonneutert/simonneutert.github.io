+++
layout = "post"
title = "Ruby's blocks and scope"
categories = ["ruby"]
tags = ["ruby"]
description = "Blocks everywhere, like it's Tetris!"
fullview = false
+++

Working with some kind of **yield** is each time a bit abstract.

And this time it was the scope that got me good...

```ruby
def tetris
  long_block = "4x1"
  cube = "4x4"
  yield
end

# this raises a NameError
# the variables defined in tetris
# are not available to the block
tetris do
  long_block + cube
end
```

fixing scope by passing the needed parts around with the block:

```ruby
def tetris
  long_block = "4x1"
  cube = "4x4"
  yield(long_block, cube)
end

tetris do |long_block, cube|
  long_block + " " + cube
end
```
