foo.style.height = '500px' // write
foo.offsetHeight // read (recalculate style, layout, expensive!)

bar.style.height = '400px' // write
bar.offsetHeight // read (recalculate style, layout, expensive!)

baz.style.height = '200px' // write
baz.offsetHeight // read (recalculate style, layout, expensive!)
