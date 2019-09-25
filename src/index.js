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
    return some(expr.split("").join(" ").replace(/\b \b/g, "").split(" "), 0).value;
}

    //20 - 57 * 12 - (  58 + 84 * 32 / 27  )
    function some(arr, i){
        
        if(i === arr.length )
            return null;

        var value = 0;
        var func = null;
        for(; i < arr.length; i++) 
        {
            if(arr[i].search(/\b/) === 0)
            {
                if(func === null)
                    value = Number(arr[i]);
                else
                {
                    if(arr[i+1] !== undefined && arr[i - 1].search(/[+\-]/) === 0 && arr[i + 1].search(/[*/]/) === 0)
                    {
                        if(arr[i-1] === "-" && value > 0 && i > 2)
                            value = -value;
                        let inner = some(arr, i);
                        value = func(value, inner.value);
                        i = inner.index;
                    } 
                    else
                        value = func(value, Number(arr[i]));  
                }
            }

            if(operations.has(arr[i]))
                func = operations.get(arr[i]);
            
            if(arr[i] === "(")
            {
                if(arr[i-1] === "-"  && value > 0)
                    value = -value;
                let inner = some(arr, i + 1);
                value = func(value, inner.value);
                i = inner.index;
            }

            if(arr[i] === ")")
                return {value: value, index: i + 1};
        }

        return {value: value, index: i};
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