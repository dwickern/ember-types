foo.style.height = '500px' // write
bar.style.height = '400px' // write
baz.style.height = '200px' // write

foo.offsetHeight // read (recalculate style, layout, expensive!)
bar.offsetHeight // read (fast since style and layout are already known)
baz.offsetHeight // read (fast since style and layout are already known)
