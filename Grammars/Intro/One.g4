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
start       : line+ EOF ;
line        : INT (',' INT)* (LINE_END_COMMENT | NEWLINE)
            | LINE_END_COMMENT
            | NEWLINE ;

/* Lexer (Scanner) Rules: start with an upper case (usually all upper case)
    These define tokens.
 */

//INT       : '0'..'9'+ ;
INT         : [0-9]+ ;                 // C-style end of line comment
LETTERS     : [a-z]+ ;
NEWLINE     : '\r'? '\n' ;
WS          : [ \t]+ -> skip;
LINE_END_COMMENT     : '//' .*? NEWLINE ;

//COMMA       : ',' ;
//DELIMITER : '\r'? '\n'  | ',' ; 

//WHILE       : 'while' ;

//ID          : [a-z]+ ;
