Learning Grammars
=================

1. Recognize integers separated by whitespace or letters

45 21 23 3 19     81 
45gs82n923nbs

2. Any number of integers on a line, separatated by a comma; whitespace is ok anywhere; can't end with a comma or miss having a comma between numbers

234, 88,9012,   34,    91
81,1,2,3
99,213,15,12

3. Same as the previous one but a newline by itself is ok; ie an empty line is ok

234, 88,9012,   34,    91

81,1,2,3
99,213,15,12

4. Extend the last one to allow comments at the end of a line, '//' '#' '--' whatever style you want

234, 88,9012,   34,    91   // end of line comment
// this is ok
81,1,2,3
99,213,15,12  // and here too