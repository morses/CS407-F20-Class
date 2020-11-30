
// Cython grammar from "The Definitive ANTLR4 Reference" by Terence Parr
// A small example of a statically typed programming language, i.e. C lite
grammar Cymbol;

file:   (functionDecl | varDecl)+ ;

varDecl
    :   type ID ('=' expr)? ';'
    ;
type:   'float' | 'int' | 'void' ; // user-defined types

functionDecl
    :   type ID '(' formalParameters? ')' block // "void f(int x) {...}"
    ;
formalParameters
    :   formalParameter (',' formalParameter)*
    ;
formalParameter
    :   type ID
    ;

block:  '{' stat* '}' ;   // possibly empty statement block
stat:   block
    |   varDecl
    |   'if' expr 'then' stat ('else' stat)?
    |   'return' expr? ';'
    |   expr '=' expr ';' // assignment
    |   expr ';'          // func call
    ;

expr:   ID '(' exprList? ')'    #Call   // func call like f(), f(x), f(1,2)
    |   ID '[' expr ']'         #Index  // array index like a[i], a[i][j]
    |   '-' expr                #Negate // unary minus
    |   '!' expr                #Not    // boolean not
    |   expr '*' expr           #Mult
    |   expr ('+'|'-') expr     #AddSub
    |   expr '==' expr          #Equal  // equality comparison (lowest priority op)
    |   ID                      #Var    // variable reference
    |   INT                     #Int
    |   '(' expr ')'            #Parens
    ;
exprList : expr (',' expr)* ;   // arg list

ID  :   LETTER (LETTER | [0-9])* ;
fragment
LETTER : [a-zA-Z] ;

INT :   [0-9]+ ;

WS  :   [ \t\n\r]+ -> skip ;

SL_COMMENT
    :   '//' .*? '\n' -> channel(HIDDEN)
    ;