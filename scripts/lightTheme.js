function changeTheme () {
'use strict';

function replaceTheme (arrSelectors) {

    let btnTheme = document.querySelector('.theme-button');

    let currThemeLS = localStorage.getItem('theme');
    if(currThemeLS === 'light') {
        modeTheme();
    } 

    function findElements (arrSelectors) {
        let elements = [];
        let classes = [];
        
        for (let i =0; i < arrSelectors.length; i++) {
            if(document.querySelector(`.${arrSelectors[i]}`)) {
                let storage = document.querySelectorAll(`.${arrSelectors[i]}`);
                storage.forEach(elem => elements.push(elem));

                if(storage.length > 1) {
                    for (let j = 0; j < storage.length; j++) {
                        classes.push(arrSelectors[i]);
                    }
                } else {
                classes.push(arrSelectors[i]);
                }
            }
        }

        return {
            Elements: elements,
            Classes: classes
        };
    }

    function modeTheme () {
        let obj = findElements(arrSelectors);
        let currTheme = btnTheme.getAttribute('id');

        if(currTheme === 'dark'){

            for (let i =0; i < obj.Elements.length; i++){
                obj.Elements[i].classList.add(`${obj.Classes[i]}-light`);
            }

            btnTheme.setAttribute('id', 'light');
            localStorage.setItem('theme', 'light');

        } else {

            for (let i =0; i < obj.Elements.length; i++){
                obj.Elements[i].classList.remove(`${obj.Classes[i]}-light`);
            }

            btnTheme.setAttribute('id', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    btnTheme.addEventListener('click', () => {
       modeTheme();
    });
}

replaceTheme(['page', 'page-header', 'container-gallery', 'page-footer', 'container-english', 'page-gallery', 'page-english', 'theme-button', 'navigation', 'page-main-dictionary', 'functions-dictionary', 'form-new-words', 'add-word', 'mode', 'navigation', 'container-progress', 'gallery', 'flex-element']);
}

export default changeTheme;