const MAX_TIP_VALUE = 100; 
const DELETE_CONTENT_INPUT_TYPE = 'deleteContentBackward';

const tipsButtons = document.querySelectorAll('.tip');
const billField = document.querySelector('#bill-field');
const customTipField = document.querySelector('.tip-field');
const peopleNumberField = document.querySelector('#number-of-people-field');
const resetButton = document.querySelector('.reset-button');

billField.addEventListener('input', event => {
    if(
        (!isValidDecimalKeyValue(event.data) && event.inputType !== DELETE_CONTENT_INPUT_TYPE) ||
        (event.data === '.' && event.target.value === '.') ||
        isDecimalFormatAlreadyFilledIn(event.target.value)
    ) {
        event.target.value = removeLastCaracter(event.target.value);
        return;
    }

    const { tipAmountByPerson, totalByPerson } = calculateTip({
        bill: billField.value,
        peopleNumber: peopleNumberField.value,
        tip: getSelectedTip(tipsButtons)?.value || customTipField.value
    });
    updateTipDisplay({ tipAmountByPerson, totalByPerson });
    resetButton.disabled = !tipAmountByPerson && !totalByPerson;
});

tipsButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.target.classList.toggle('selected');

        unselectButtons(tipsButtons, event.target);

        customTipField.value = null;

        const { tipAmountByPerson, totalByPerson } = calculateTip({
            bill: billField.value,
            peopleNumber: peopleNumberField.value,
            tip: getSelectedTip(tipsButtons)?.value || customTipField.value
        });
        updateTipDisplay({ tipAmountByPerson, totalByPerson });
        resetButton.disabled = !tipAmountByPerson && !totalByPerson;
    });
});

customTipField.addEventListener('input', event => {
    if((!isValidIntegerKeyValue(event.data) && event.inputType !== DELETE_CONTENT_INPUT_TYPE) || Number(event.target.value) > MAX_TIP_VALUE) {
        event.target.value = removeLastCaracter(event.target.value);
        return;
    }

    unselectButtons(tipsButtons);

    const { tipAmountByPerson, totalByPerson } = calculateTip({
        bill: billField.value,
        peopleNumber: peopleNumberField.value,
        tip: getSelectedTip(tipsButtons)?.value || customTipField.value
    });
    updateTipDisplay({ tipAmountByPerson, totalByPerson });
    resetButton.disabled = !tipAmountByPerson && !totalByPerson;
});

peopleNumberField.addEventListener('input', event => {
    if(!isValidIntegerKeyValue(event.data) && event.inputType !== DELETE_CONTENT_INPUT_TYPE) {
        event.target.value = removeLastCaracter(event.target.value);
        return;
    }

    let fieldGroupParent = event.target.closest('.field-group');

    if(event.target.value && Number(event.target.value) === 0) {
        fieldGroupParent.classList.add('invalid-field');
        return;
    }

    fieldGroupParent.classList.remove('invalid-field');

    const { tipAmountByPerson, totalByPerson } = calculateTip({
        bill: billField.value,
        peopleNumber: peopleNumberField.value,
        tip: getSelectedTip(tipsButtons)?.value || customTipField.value
    });
    updateTipDisplay({ tipAmountByPerson, totalByPerson });
    resetButton.disabled = !tipAmountByPerson && !totalByPerson;
});

resetButton.addEventListener('click', () => {
    unselectButtons(tipsButtons);

    billField.value = null;
    customTipField.value = null;
    peopleNumberField.value = null;

    const { tipAmountByPerson, totalByPerson } = calculateTip({
        bill: billField.value,
        peopleNumber: peopleNumberField.value,
        tip: getSelectedTip(tipsButtons)?.value || customTipField.value
    });
    updateTipDisplay({ tipAmountByPerson, totalByPerson });
    resetButton.disabled = !tipAmountByPerson && !totalByPerson;
});

function unselectButtons(buttons, selectedButton) {
    buttons.forEach(button => {
        if(button.value !== selectedButton?.value) {
            button.classList.remove('selected');
        }
    });
}

function isValidDecimalKeyValue(value) {
    return /[0-9\.]/.test(value);
}

function hasValue(fieldValue) {
    return fieldValue !== 0 && !!fieldValue;
}

function isDecimalFormatAlreadyFilledIn(value) {
    return /^[0-9]+\.[0-9]{3}$/.test(value);
}

function removeLastCaracter(string) {
    return string.slice(0, -1);
}

function isValidIntegerKeyValue(value) {
    return /[0-9]/.test(value);
}

function calculateTip({ bill, peopleNumber, tip }) {
    const tipResult = {
        tipAmountByPerson: 0,
        totalByPerson: 0
    };

    if(bill && peopleNumber && tip) {
        bill = Number(bill);
        peopleNumber = Number(peopleNumber);
        tip = Number(tip);

        let tipAmount = bill * tip / 100;

        tipResult.tipAmountByPerson = tipAmount / peopleNumber;
        tipResult.totalByPerson = (bill + tipAmount) / peopleNumber;
    }

    return tipResult;
}

function getSelectedTip(tipButtons) {
    return [...tipButtons].find(button => button.classList.contains('selected'));
}

function updateTipDisplay({ tipAmountByPerson, totalByPerson }) {
    const tipAmountEl = document.getElementById('tip-amount-value');
    const totalEl = document.getElementById('total-value');

    tipAmountEl.innerText = `$${tipAmountByPerson.toFixed(2)}`;
    totalEl.innerText = `$${totalByPerson.toFixed(2)}`;
}
