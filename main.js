const calculator = {
    init: function () {
        this.displayNumber = '0';
        this.firstNumber = null;
        this.operator = null;
        this.waitingForSecondNumber = false;
    }
};


const octopus = {
    init: function () {
        calculator.init();
        view.init()
    },

    clearCalculator: function () {
        calculator.init();
        view.update();
    },

    inputDigit: function (digit) {
        if (calculator.waitingForSecondNumber && calculator.displayNumber === calculator.firstNumber) {
            calculator.displayNumber = digit;
        } else {
            if (calculator.displayNumber === '0') {
                calculator.displayNumber = digit;
            } else {
                calculator.displayNumber += digit;
            }
        }

        view.update()
    },

    performCalculation: function () {
        if (!calculator.firstNumber || !calculator.operator) {
            alert('Anda belum menetapkan operator');
            return;
        }
        let result = 0;
        if (calculator.operator === "+") {
            result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber)
        } else if (calculator.operator === "-") {
            result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
        }
        calculator.displayNumber = result;
        view.update();
    },

    handleOperator: function (operator) {
        if (!calculator.waitingForSecondNumber) {
            calculator.operator = operator;
            calculator.waitingForSecondNumber = true;
            calculator.firstNumber = calculator.displayNumber;
        } else {
            alert("Operator sudah ditetapkan");
        }
        view.update();
    },

    inverseNumber: function () {
        if (calculator.displayNumber === '0') return;
        calculator.displayNumber = calculator.displayNumber * -1;
        view.update();
    },

    getDisplayNumber: function () {
        return calculator.displayNumber;
    },
};

const view = {
    init: function () {
        this.displayNumber = document.getElementById("displayNumber");
        this.buttons = document.getElementsByClassName("button");

        for (let button of this.buttons) {
            button.addEventListener('click', event => {
                const {target} = event;
                if (!target.matches('div')) {
                    return;
                }

                if (target.classList.contains('operator')) {
                    octopus.handleOperator(target.innerText);
                    return;
                }

                if (target.classList.contains('clear')) {
                    octopus.clearCalculator();
                    return;
                }

                if (target.classList.contains('negative')) {
                    octopus.inverseNumber();
                    return;
                }

                if (target.classList.contains('equals')) {
                    octopus.performCalculation();
                    return;
                }

                octopus.inputDigit(target.innerText)
            })
        }

    },

    update: function () {
        this.displayNumber.innerText = octopus.getDisplayNumber();
    },

};

octopus.init();