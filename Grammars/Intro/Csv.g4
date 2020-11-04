grammar Csv ;

/*
Symbol, Open Price, Closing Price,Note
MSFT,200.32,   210.2,"symbol,dsss"
DVDS,1021.0,5   5.2,anything@#$#@,2
 */

start       : hdr line* ;
hdr         : line ;
line        : field (',' field)* NEWLINE ;
field       : TEXT
            | STRING ;

fragment ESC: '\\' [btnr"\\] ;
TEXT        : ~[,"\n\r]+ ;
STRING      : '"' ( ESC | .)*? '"';
NEWLINE     : '\r'? '\n' ;
//WS          : [ \t]+ -> skip;