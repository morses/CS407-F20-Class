grammar Expr;

/* A weird expression grammar
5 + 12.23 / 89 ;
"hello" * 3 - 2 ; 5 / 8 ;
 */

start       : statement+ ;
statement   : expr ';' ;
expr        : expr '^' expr
            | expr '*' expr
            | expr '/' expr
            | expr '+' expr
            | expr '-' expr
            | INT
            | FLOAT
            | IDENTIFIER
            | STRING ;


fragment DIGIT     : [0-9] ;
fragment ID_LETTER : [a-zA-Z_] ;
fragment ESC       : '\\' [btnr"\\] ;

STRING      : '"' ( ESC | .)*? '"';
IDENTIFIER  : ID_LETTER (ID_LETTER | DIGIT)*;
INT         : DIGIT+ ;
FLOAT       : DIGIT+ '.' DIGIT*
            | '.' DIGIT+ ;
NEWLINE     : '\r'? '\n' -> skip ;
WS          : [ \t]+ -> skip;