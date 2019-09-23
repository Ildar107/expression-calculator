function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if(expr.replace(/[0-9]/g, "").replace(/[)]/,"").length !== expr.replace(/[0-9]/g, "").replace(/[()]/,"").length)
        throw "ExpressionError: Brackets must be paired";
    
}

module.exports = {
    expressionCalculator
}