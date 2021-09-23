class Calculator {
    constructor(previousTextElement, currentTextElement){
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }
    clear() {
        this.current =''
        this.previous =''
        this.operation = undefined
    }
    delete() {
        this.current = this.current.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number == '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.current === '') return
        if (this.previous !== ''){
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const current = parseFloat(this.current)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+': 
            computation = +(prev + current).toFixed(1) // I used toFixed() to fix some problems for example (0.1+0.2 =0.30000000000000004) so now it 0.3
            break
            case '-': 
            computation = prev - current 
            break
            case '×': 
            computation = prev * current 
            break
            case '÷': 
            computation = prev / current 
            break
            default :
            return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentTextElement.innerText = 
        this.getDisplayNumber(this.current)
        if (this.operation != null) {
        this.previousTextElement.innerText = 
          `${this.previous} ${this.operation}`
            
        } else {
            this.previousTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousTextElement = document.querySelector('[data-previous]')
const currentTextElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
})})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
})})

equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})

// -----------------------new Update-------v-1.1------------- 

/*
---------- now you are able to use the calculator by clickign your keyboard -------------
*/

function clickButtonK(key) {
    numberButtons.forEach(button => {
        if (button.innerText === key){
            button.click()
        }
    })
}

function clickOperation(key) {
    operationButtons.forEach(button => {
        if (button.innerText === key) {
            button.click()
        }
    })
}

function clickEqual(key) {
    equalsButton.click()
}

function clickclear(key) {
    deleteButton.click()
}

function clickAC(key) {
    allClearButton.click()
}

window.addEventListener('keydown', (e) => {
     if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
    clickButtonK(e.key)
    } else if (
        e.key === '+' ||
        e.key === '-' 
    ){
        clickOperation(e.key)
    } else if (
        e.key === '*'
    ) {
        clickOperation('×')
    } else if (
        e.key === '/'
    ) {
        clickOperation('÷')
    } else if (
        e.key === 'Enter' || e.key === '='
    ) {
        clickEqual()
    } else if (
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'Del'
        ) {
            clickclear()
    } else if (
        e.key === 'Home'
    ) {
        clickAC()
    }
})



