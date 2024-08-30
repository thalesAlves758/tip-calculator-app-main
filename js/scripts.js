
const tipsButtons = document.querySelectorAll('.tip');
const billField = document.querySelector('#bill-field');
const customTipField = document.querySelector('.tip-field');
const peopleNumberField = document.querySelector('#number-of-people-field');

tipsButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.target.classList.toggle('selected');

        unselectButtons(tipsButtons, event.target);

        customTipField.value = null;
    });
});

billField.addEventListener('input', event => {
    if(
        (!isValidDecimalKeyValue(event.data) && event.inputType !== 'deleteContentBackward') ||
        (event.data === '.' && event.target.value === '.') ||
        isDecimalFormatAlreadyFilledIn(event.target.value)
    ) {
        event.target.value = event.target.value.slice(0, -1);
    }
});

customTipField.addEventListener('input', event => {
    if((!isValidIntegerKeyValue(event.data) && event.inputType !== 'deleteContentBackward') || Number(event.target.value) > 100) {
        event.target.value = event.target.value.slice(0, -1);
    }

    unselectButtons(tipsButtons);
});

peopleNumberField.addEventListener('input', event => {
    if(!isValidIntegerKeyValue(event.data) && event.inputType !== 'deleteContentBackward') {
        event.target.value = event.target.value.slice(0, -1);
        return;
    }

    let fieldGroupParent = event.target.closest('.field-group');

    if(event.target.value && Number(event.target.value) === 0) {
        fieldGroupParent.classList.add('invalid-field');
        return;
    }

    fieldGroupParent.classList.remove('invalid-field');
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

function isValidIntegerKeyValue(value) {
    return /[0-9]/.test(value);
}
