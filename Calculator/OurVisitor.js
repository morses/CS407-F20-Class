const CalculatorVisitor = require('./CalculatorVisitor').CalculatorVisitor;

class OurVisitor extends CalculatorVisitor {

    constructor(){
        super();
        this.spreadsheet = {"A1": 5, "A2": 10.0, "B1": 3.4, "B2": -77.124};
    }

    //  | NUMBER                                    #numericAtomExp
    visitNumericAtomExp(ctx){
        // no children, just convert from string to number type
        return Number(ctx.getText());
    }

    // 	| <assoc=right>  expression '^' expression	#powerExp
    visitPowerExp(ctx){
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        const result = Math.pow(left,right);            
        return result;
    }

    //  | expression (ASTERISK|SLASH) expression    #mulDivExp
    visitMulDivExp(ctx){
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        let result = 0;

        if (ctx.ASTERISK() != null)
            result = left * right;
        if (ctx.SLASH() != null)
            result = left / right;

        return result;
    }

    //  : '(' expression ')'                        #parenthesisExp
    visitParenthesisExp(ctx){
        // pass the buck on this one, just evaluate the expression inside
        return this.visit(ctx.expression());
    }

    //  | ID                                        #idAtomExp
    visitIdAtomExp(ctx){
        // look up this value in our spreadsheet
        // if it isn't in our sample, return undefined which will propagate
        const cellID = ctx.getText();
        return this.spreadsheet[cellID];
    }

    //  | expression (PLUS|MINUS) expression        #addSubExp
    visitAddSubExp(ctx){
        const left = this.visit(ctx.expression(0));
        const right = this.visit(ctx.expression(1));
        let result = 0;

        if (ctx.PLUS() != null)
            result = left + right;
        if (ctx.MINUS() != null)
            result = left - right;

        return result;
    }

    //  | NAME '(' expression ')'                   #functionExp
    visitFunctionExp(ctx){
        const name = ctx.NAME().getText();
        let result = 0;

        switch(name)
        {
            case "sqrt":
                result = Math.sqrt(this.visit(ctx.expression()));
                break;

            case "log":
                result = Math.log10(this.visit(ctx.expression()));
                break;
        }

        return result;
    }

}

exports.OurVisitor = OurVisitor;