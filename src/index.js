function eval() {
    // Do not use eval!!!
    return;
}

const operations = new Map([
    ["+", (x,y) => x + y],
    ["-", (x,y) => x-y],
    ["*", (x,y) => x*y],
    ["/", (x,y) => {
        if( y === 0)
            throw "TypeError: Devision by zero.";
        return x / y;
    }]
]);

function expressionCalculator(expr) {
    expr = expr.replace(/ /g, "");
    if(expr.replace(/[0-9]/g, "").replace(/[)]/,"").length !== expr.replace(/[0-9]/g, "").replace(/[(]/,"").length)
        throw "ExpressionError: Brackets must be paired";
    return getResult(expr.split("").reverse().join(""));
}

function getResult(expr){
    if(expr.length === 0)
        return null;

    var rValue = 0;
    while(expr.length > 0)
    {
        if(expr[0].search(/[0-9]/) === 0)
        {
            var nextIndex = expr.search(/[+\-*/)]/) === -1 ? expr.length : expr.search(/[+\-*/)]/);
            rValue = Number(expr.substring(0, nextIndex));
            expr = expr.substring(nextIndex, expr.length);
        }   

        if(operations.has(expr[0]))
        {
            if(expr[0].search(/[\-+]/) === 0)
            {    
                rValue = operations.get(expr[0])(rValue, getResult(expr.substring(1, expr.length)));
                expr = expr.substring(1, expr.length);
                break;
            }
            else
            {
                var next = expr.substring(1,expr.length).search(/[+\-*/)]/) === -1 ? expr.length : expr.substring(1,expr.length).search(/[+\-*/)]/);
                rValue = operations.get(expr[0])(rValue, Number(expr.substring(1, next + 1)));
                expr = expr.substring(next + 1, expr.length);
            }
        }

        if(expr[0] === "(" || expr[0] === ")")
        {
            var temp = getResult(expr.substring(1, expr.length));
            return temp === null ? rValue : temp ;
        }
    }

    return rValue;
 }

module.exports = {
    expressionCalculator
}