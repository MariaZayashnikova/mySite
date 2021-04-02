'use strict';

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

function activeLightTheme (arrElements, arrClassesElements) {
    for (let i =0; i < arrElements.length; i++){
        arrElements[i].classList.add(`${arrClassesElements[i]}-light`);
    }
}

function changeTheme () {

    function replaceTheme (arrSelectors) {

        let btnTheme = document.querySelector('.theme-button');

        let currThemeLS = localStorage.getItem('theme');
        if(!currThemeLS) {
            localStorage.setItem('theme', 'dark');
        }
        if(currThemeLS === 'light') {
            modeTheme('dark');
        } 

    function activeDarkTheme (arrElements, arrClassesElements) {
        for (let i =0; i < arrElements.length; i++){
            arrElements[i].classList.remove(`${arrClassesElements[i]}-light`);
        }
    }

    function modeTheme (currTheme) {
        let obj = findElements(arrSelectors);

        if(currTheme === 'dark'){
            activeLightTheme(obj.Elements, obj.Classes);
            localStorage.setItem('theme', 'light');
        } else {
            activeDarkTheme(obj.Elements, obj.Classes);
            localStorage.setItem('theme', 'dark');
        }
    }

    btnTheme.addEventListener('click', () => {
        let currTheme = localStorage.getItem('theme');
        modeTheme(currTheme);
    });
}

replaceTheme(['page', 'page-header', 'container-gallery', 'page-footer', 'container-english', 'page-gallery', 'page-english', 'theme-button', 'navigation', 'page-main-dictionary', 'functions-dictionary', 'form-new-words', 'add-word', 'mode', 'navigation', 'container-progress', 'gallery', 'flex-element', 'input-rus-word', 'input-en-word', 'input-prompt']);
}

export default changeTheme;
export {findElements, activeLightTheme};