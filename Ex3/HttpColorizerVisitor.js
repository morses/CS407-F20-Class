const HttpVisitor = require('./HttpVisitor').HttpVisitor;

class HttpColorizerVisitor extends HttpVisitor {

    constructor(){
        super();
    }

    //message     : start_line (header_field CRLF)* CRLF ;
    visitMessage = function(ctx) {
        let startLine = this.visitStart_line(ctx.start_line());

        let hfArray = ctx.header_field();
        let out = [];
        for(let i = 0; i < hfArray.length; i++)
        {
           out.push(this.visitHeader_field(hfArray[i]));
        }
        // Do we have a request or a response
        let cls = "response";
        if(ctx.start_line().request_line())
        {
            cls = "request";
        }
        return `<div class="${cls}">` + startLine + out.join('\n') + '</div>';
      };

    // start_line  : request_line | status_line ;
    visitStart_line(ctx){
        if(ctx.request_line())
        {
            return this.visitRequest_line(ctx.request_line());
        }
        else if(ctx.status_line())
        {
            return this.visitStatus_line(ctx.status_line());
        }
        else
        {
            return null;
        }
    }

    //request_line: method SP request_target SP http_version CRLF ;
    visitRequest_line(ctx){
        let method = `<span class="method">${ctx.method().getText()}</span> `;
        let target = `<span class="request-target">${ctx.request_target().getText()}</span> `;
        let version = `${ctx.http_version().getText()}`;
        return '<span class="request-line">' + method + target + version + '</span>\n';
    }

    //status_line : http_version SP status_code SP reason_phrase CRLF ;
    visitStatus_line(ctx){
        let version = `${ctx.http_version().getText()} `;
        let code = `<span class="status-code">${ctx.status_code().getText()}</span> `;
        let reason = `${ctx.reason_phrase().getText()}`;
        return '<span class="status-line">' + version + code + reason + '</span>\n';
    }

    // header_field: field_name ':' SP* field_value SP* ;
    visitHeader_field(ctx) {
        return `<span class="key">${ctx.field_name().getText()}</span>: <span class="value">${ctx.field_value().getText()}</span>`;
    }
    
}

exports.HttpColorizerVisitor = HttpColorizerVisitor;