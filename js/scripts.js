
const tipsButtons = document.querySelectorAll('.tip');
const peopleNumberField = document.querySelector('#number-of-people-field');

initTipsButtonsClickFunctions(tipsButtons);
initPeopleNumberChangeFuntion(peopleNumberField);

function initTipsButtonsClickFunctions(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            event.target.classList.toggle('selected');

            buttons.forEach(unselectedButton => {
                if(unselectedButton.value !== event.target.value) {
                    unselectedButton.classList.remove('selected');
                }
            })
        });
    });
}

function initPeopleNumberChangeFuntion(field) {
    field.addEventListener('keyup', event => {
        let fieldGroupParent = event.target.closest('.field-group');

        if(event.target.value && Number(event.target.value) === 0) {
            fieldGroupParent.classList.add('invalid-field');
            return;
        }

        fieldGroupParent.classList.remove('invalid-field');
    });
}
