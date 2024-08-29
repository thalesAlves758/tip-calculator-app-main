
const tipsButtons = document.querySelectorAll('.tip');

initTipsButtonsClickFunctions(tipsButtons);

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
