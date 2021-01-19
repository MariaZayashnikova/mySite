'use strict';

function replaceTheme (arrSelectors) {

    let btnTheme = document.querySelector('.theme-button');

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

    btnTheme.addEventListener('click', () => {
        let obj = findElements(arrSelectors);
        let currTheme = btnTheme.getAttribute('id');

        if(currTheme === 'dark'){

            for (let i =0; i < obj.Elements.length; i++){
                obj.Elements[i].classList.add(`${obj.Classes[i]}-light`);
            }

            btnTheme.setAttribute('id', 'light');

        } else {

            for (let i =0; i < obj.Elements.length; i++){
                obj.Elements[i].classList.remove(`${obj.Classes[i]}-light`);
            }

            btnTheme.setAttribute('id', 'dark');
        }
    });
}

replaceTheme(['about-image', 'page', 'page-header', 'container-gallery', 'page-footer', 'container-english', 'page-gallery', 'page-english', 'theme-button', 'navigation']);