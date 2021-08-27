function eval() {
    // Do not use eval!!!
    return;
}
let expr = '2+2*2*3*4-1'
function expressionCalculator(expr) {
    let config = {
        '+': 1,
        '-': 1,
        '/': 2,
        '*': 2,
        // '(': 1
    }
    let outStack = []
    let arithmeticStack = []
    let actions = ['+', '-', '*', '/']
    let validExpression = ''


    function tokenizeAndValidate(expr) {
        let openBrackets = 0
        let closeBrackets = 0

        for (let i = 0; i < expr.length; i++) {
            let el = expr[i]
            if (el === ' ') continue
            else if (el === '(') {
                validExpression += el + ' '
                openBrackets++
            } else if (el === ')') {
                validExpression += ' ' + el
                closeBrackets++
            } else if (actions.includes(el)) {
                validExpression += ` ${el} `
            } else {
                validExpression += el
            }
        }

        console.log(validExpression);
        if (openBrackets !== closeBrackets) {
            throw new SyntaxError('Brackets must be paired')
        }
    }

    function  RPN(validExpression) {
        let expressionArray = validExpression.split(' ')

        let counter = 0;

        while ( counter < expressionArray.length ) {
            let curEl = expressionArray[counter];
            


            if ( !actions.includes(curEl) && curEl !== ')' && curEl !== '(') {
                outStack.push(curEl)
                counter++
            } else if ( curEl === '(') {
                arithmeticStack.push(curEl)
                counter++
            } else if ( (!arithmeticStack.length) || (config[curEl] > config[arithmeticStack[arithmeticStack.length - 1]]) || arithmeticStack[arithmeticStack.length - 1] === '(' ) {
                arithmeticStack.push(curEl)
                counter++
            } else if( config[curEl] <= config[arithmeticStack[arithmeticStack.length - 1]] ) {
                let i = arithmeticStack.length - 1
                console.log('arithmetic stack top el, while current <= topStack----',arithmeticStack[i], 'currentEl----',curEl);
                console.log('arithmetic stack ',arithmeticStack, 'outstack----',outStack);
                while ( config[arithmeticStack[i]] >= config[curEl] ) {
                   outStack.push(arithmeticStack.pop())
                }
                if( !arithmeticStack.length || config[arithmeticStack[i]] < curEl ) {
                arithmeticStack.push(curEl)    
                counter++
                } else {
                    i--
                }
            } 
// ----------------------вот то сюда все норм--------------

            else if ( curEl === ')') {
                let i = arithmeticStack.length - 1
                while (arithmeticStack[i] !== '(' || !arithmeticStack.length) {
                    outStack.push(arithmeticStack.pop())
                }
                if( arithmeticStack[i] === '(' ) {
                    arithmeticStack.pop()
                }
                counter++
            }
        }
        while( arithmeticStack.length >= 1 ) {
            outStack.push(arithmeticStack.pop())
        }
        console.log(outStack, arithmeticStack);
    }

    tokenizeAndValidate(expr)
    RPN(validExpression)



    // write your solution here
}

expressionCalculator(expr)

module.exports = {
    expressionCalculator
}