function eval() {
    // Do not use eval!!!
    return;
}

const operations = new Map([
    ["+", (x,y) => x + y],
    ["-", (x,y) => x - y],
    ["*", (x,y) => x*y],
    ["/", (x,y) => {
        if( y === 0)
            throw "TypeError: Devision by zero.";
        return x / y;
    }]
]);

function expressionCalculator(expr) {
    expr = expr.replace(/ /g, "");
    if(expr.replace(/[\d+\-*/)]/g, "").length !== expr.replace(/[\d+\-*/(]/g, "").length)
        throw "ExpressionError: Brackets must be paired";
    return some(expr.split("").join(" ").replace(/\b \b/g, "").split(" ")).value;
}

    //20 - 57 * 12 - (  58 + 84 * 32 / 27  )
    function some(arr){
        
        var bracketsStack = [];
        var multiplyStack = [];
        var sumStack = [];
        var fBracketsIndex = arr.findIndex(x => x === "(");
        var lBracketsIndex = arr.findIndex(x => x === ")");
        var index = 0;
        console.log(arr.join(''));
        while(fBracketsIndex >= 0 && fBracketsIndex < lBracketsIndex)
        {    

            let result = some(arr.slice(fBracketsIndex + 1, arr.length));
            bracketsStack = arr.slice(0, fBracketsIndex);
            bracketsStack.push(result.value);
            index = result.index + fBracketsIndex + 2;
            bracketsStack = bracketsStack.concat(arr.slice(index, arr.length));
            lBracketsIndex = bracketsStack.findIndex(x => x === ")");
            fBracketsIndex = bracketsStack.findIndex(x => x === "(");
            arr = bracketsStack;
        }

        if(bracketsStack.length === 0)
            bracketsStack = arr;
        
        if(lBracketsIndex > 0)
        {   
            index = index > 0 ? index : lBracketsIndex;
            bracketsStack.length = lBracketsIndex;
        }

        for(let i = 0; i < bracketsStack.length; i++)
        {
            if(bracketsStack[i] === "*" || bracketsStack[i] === "/")
            {
                let func = operations.get(bracketsStack[i]);
                multiplyStack.push(func(multiplyStack.pop(), bracketsStack[i+1]));
                i++;
            }
            else    
                multiplyStack.push(operations.has(bracketsStack[i]) ? bracketsStack[i] : Number(bracketsStack[i]));
        }

        for(let i = 0; i < multiplyStack.length; i++)
        {
            if(multiplyStack[i] === "+" || multiplyStack[i] === "-")
            {
                let func = operations.get(multiplyStack[i]);
                sumStack.push(func(sumStack.pop(), multiplyStack[i+1]));
                i++;
            }
            else
                sumStack.push(Number(multiplyStack[i]));
        }

        return {value :sumStack.pop(), index: index};
    }



module.exports = {
    expressionCalculator
}