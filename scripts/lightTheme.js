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
                elements.push(document.querySelector(`.${arrSelectors[i]}`));
                classes.push(arrSelectors[i]);
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

replaceTheme(['page', 'page-header', 'container-gallery', 'page-footer', 'container-english', 'page-gallery', 'page-english', 'theme-button', 'navigation', 'page-main-dictionary', 'functions-dictionary', 'form-new-words', 'add-word', 'mode', 'navigation', 'container-progress']);
}

export default changeTheme;