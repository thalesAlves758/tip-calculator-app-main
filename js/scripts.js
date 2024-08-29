
const tipsButtons = document.querySelectorAll('.tip');
const billField = document.querySelector('#bill-field');
const customTipField = document.querySelector('.tip-field');
const peopleNumberField = document.querySelector('#number-of-people-field');

initDecimalFieldsStandardChangeFunctions(billField);

initIntegerNumberChangeFuntions(customTipField);

initIntegerNumberChangeFuntions(peopleNumberField);
initPeopleNumberFieldChangeFunctions(peopleNumberField);

tipsButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.target.classList.toggle('selected');

        unselectButtons(tipsButtons, event.target);

        customTipField.value = null;
    });
});

customTipField.addEventListener('input', () => {
    unselectButtons(tipsButtons);
});

function initDecimalFieldsStandardChangeFunctions(field) {
    initStandardNumberFieldChangeFunction(field);

    field.addEventListener('keydown', event => {
        if(
            (event.key === '.' && !hasValue(event.target.value)) ||
            (isDecimalFormatAlreadyFilledIn(event.target.value) && event.key !== 'Backspace')
        ) {
            event.preventDefault();
        }
    });
}

function hasValue(fieldValue) {
    return fieldValue !== 0 && !!fieldValue;
}

function isDecimalFormatAlreadyFilledIn(value) {
    return /^[0-9]+\.[0-9]{2}$/.test(value);
}

function initIntegerNumberChangeFuntions(field) {
    initStandardNumberFieldChangeFunction(field);

    field.addEventListener('keydown', event => {
        let fullValue = `${event.target.value}${event.key}`;
        if(event.key === '.' || (event.key !== 'Backspace' && Number(fullValue) > Number(event.target.max))) {
            event.preventDefault();
        }
    });
}

function initStandardNumberFieldChangeFunction(field) {
    field.addEventListener('keydown', event => {
        if(isForbiddenKey(event.key)) {
            event.preventDefault();
        }
    });
}

function isForbiddenKey(key) {
    const forbiddenKeys = [
        '-',
        '+',
        ','
    ];

    return forbiddenKeys.includes(key);
}

function initPeopleNumberFieldChangeFunctions(field) {
    field.addEventListener('input', event => {
        let fieldGroupParent = event.target.closest('.field-group');

        if(event.target.value && Number(event.target.value) === 0) {
            fieldGroupParent.classList.add('invalid-field');
            return;
        }

        fieldGroupParent.classList.remove('invalid-field');
    });
}

function unselectButtons(buttons, selectedButton) {
    buttons.forEach(button => {
        if(button.value !== selectedButton?.value) {
            button.classList.remove('selected');
        }
    });
}
