const antlr4 = require('antlr4/index');
const ChatLexer = require('./ChatLexer');
const ChatParser = require('./ChatParser');
const HtmlChatListener = require('./HtmlChatListener').HtmlChatListener;
const ChatErrorListener = require('./ChatErrorListener').ChatErrorListener;

// Node.js application that prompts the user for input then processes it with an antlr listener
// Use this with the Chat.g4 example from the ANTLR4 Mega Tutorial

// simulate a writable stream with an array, need something to replace the writable stream from the http server example
class WStream {
    constructor() {
        this.output = [];
    }
    write(content){this.output.push(content);}
    toString() {return this.output.join("");}
};

// Surprisingly difficult to write a simple interactive command line program in Javascript
// (because it doesn't have blocking I/O)

// console prompt code from: https://stackoverflow.com/questions/8128578/reading-value-from-console-interactively
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let prompt = function(ques) {
    return new Promise( (res, rej) => {
        rl.question( ques, answer => {
            res(answer);
        })
    });
};

// main function
async function main() {
    let input;
    while ( input != 'quit' ) {
        // prompt user for input
        input = await prompt('chat: ');

        if(input === 'quit')
            continue;
        //console.log("processing " + input);

        const response = new WStream();
        //res.write('<html><head><meta charset="UTF-8"/></head><body>');
   
        let chars = new antlr4.InputStream(input + "\n");  //need \n for end of chat line
        let lexer = new ChatLexer.ChatLexer(chars);
        let tokens  = new antlr4.CommonTokenStream(lexer);
        let parser = new ChatParser.ChatParser(tokens);  
        parser.buildParseTrees = true;   
        let tree = parser.chat();   
        let htmlChat = new HtmlChatListener(response);
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(htmlChat, tree);
        //res.write('</body></html>');
 
        console.log("\t" + response.toString());
    }
    console.log( 'Bye!');
    rl.close();
}

main();