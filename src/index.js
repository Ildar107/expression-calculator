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

function reverse(expr)
{
    var numArr = expr.split(/[+\-*/()]/).filter(x=>x);
    var exprArr = expr.replace(/[0-9]{1,9}/g, "Z").split("").reverse();
    var reverseArr = [];
    for(var i =0; i < exprArr.length; i++)
    {
        if(exprArr[i] === "Z")
            reverseArr.push(numArr.pop());
        if(exprArr[i].search(/[()]/) === 0)
            reverseArr.push(exprArr[i] === "(" ? ")" : "(");
        if(operations.has(exprArr[i]))
            reverseArr.push(exprArr[i]);
    }
    return reverseArr.join("");
}

function expressionCalculator(expr) {
    expr = expr.replace(/ /g, "");
    if(expr.replace(/[\d+\-*/)]/g, "").length !== expr.replace(/[\d+\-*/(]/g, "").length)
        throw "ExpressionError: Brackets must be paired";
    //expr = reverse(expr);
    return getResult(expr);
}

function getResult(expr){
    if(expr.length === 0)
        return null;

    var rValue = 0;
    while(expr.length > 0)
    {
        //let length = expr.length -1;
        if(expr[0].search(/[0-9]/) === 0)
        {
            var nextIndex = expr.search(/[+\-*/)]/) === -1 ? expr.length : expr.search(/[+\-*/)]/);
            rValue = Number(expr.substring(0, nextIndex));
            expr = expr.substring(nextIndex, expr.length);
        }   

        if(operations.has(expr[0]))
        {
            let checkArr = expr.replace(/\d/g,"").split("");
            if(expr[0].search(/[\-+]/) === 0 && checkArr.length > 1 && checkArr[1].search(/[*/(]/) === 0)
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