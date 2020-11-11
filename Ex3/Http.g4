grammar Http ;

/* HTTP head grammar, no body */
message     : start_line (header_field CRLF)* CRLF ;
start_line  : request_line
            | status_line ;
request_line: method SP request_target SP http_version CRLF ;
status_line : http_version SP status_code SP reason_phrase CRLF ;
header_field: field_name ':' SP* field_value SP* ;
method      : 'GET'
            | 'HEAD'
            | 'POST'
            | 'PUT'
            | 'PATCH'
            | 'DELETE'
            | 'CONNECT'
            | 'OPTIONS'
            | 'TRACE' ;
request_target  : TEXT ;
http_version    : HTTP_VERSION;
status_code     : INT ;
reason_phrase   : TOKEN ;
field_name      : TOKEN ;
field_value     : ((TEXT | TOKEN | INT) SP? ':'?)+  ;

/* Lexer Rules */
fragment DIGIT  : [0-9] ;
INT             : DIGIT+ ;
HTTP_VERSION    : 'HTTP/2' | 'HTTP/1.1' | 'HTTP/1.0' ;
TOKEN           : [a-zA-Z0-9!#$%&'*+-.^_`|~]+ ;     // does not contain spaces or delimeters
TEXT            : ~[ \r\n:]+ ;                      // allows delimeters but no colon, space or newline
SP              : ' ' ;
CRLF            : '\r'? '\n';