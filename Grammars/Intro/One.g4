grammar One;

/* Parser Rules: start with a lowercase letter (usually all lower case) */

//start       : (INT LETTERS)+ EOF;

//start       : (line NEWLINE)+ EOF ;
//line        : INT (',' INT)* ;

//start   : INT (DELIMITER INT)* EOF;

// 3 
//start       : line+ EOF ;
//line        : INT (',' INT)* NEWLINE ;

// 4
/*
start       : line+ EOF ;
line        : INT (',' INT)* (LINE_END_COMMENT | NEWLINE)
            | LINE_END_COMMENT
            | NEWLINE ;
*/

start       : line+ EOF ;
line        : field (',' field)* (LINE_END_COMMENT | NEWLINE)
            | LINE_END_COMMENT
            | NEWLINE ;

field       : INT
            | FLOAT
            | STRING 
            | id ;

id          : IDENTIFIER ;

/* Lexer (Scanner) Rules: start with an upper case (usually all upper case)
    These define tokens.
 */

fragment DIGIT     : [0-9] ;
fragment ID_LETTER : [a-zA-Z_] ;
fragment ESC       : '\\' [btnr"\\] ;

STRING      : '"' ( ESC | .)*? '"';
IDENTIFIER  : ID_LETTER (ID_LETTER | DIGIT)*;
//INT       : '0'..'9'+ ;
INT         : DIGIT+ ;                 // C-style end of line comment
FLOAT       : DIGIT+ '.' DIGIT*
            | '.' DIGIT+ ;
//LETTERS     : [a-z]+ ;
NEWLINE     : '\r'? '\n' ;
WS          : [ \t]+ -> skip;
LINE_END_COMMENT     : '//' .*? NEWLINE ;

//COMMA       : ',' ;
//DELIMITER : '\r'? '\n'  | ',' ; 

//WHILE       : 'while' ;

//ID          : [a-z]+ ;
