'use strict';

function replaceTheme (arrSelectors) {

    let btnTheme = document.querySelector('.theme-button');

    function findElements (arrSelectors) {
        let elements = [];
        
        for (let i =0; i < arrSelectors.length; i++) {
            if(document.querySelector(`.${arrSelectors[i]}`)) {
                elements.push(document.querySelector(`.${arrSelectors[i]}`));
            }
        }

        elements.push(btnTheme);

        return elements;
    }

    btnTheme.addEventListener('click', () => {
        let elements = findElements(arrSelectors);
        let currTheme = btnTheme.getAttribute('id');

        if(currTheme === 'dark'){

            for (let i =0; i < elements.length; i++){
                elements[i].classList.add(`${arrSelectors[i]}-light`);
            }

            btnTheme.setAttribute('id', 'light');

        } else {

            for (let i =0; i < elements.length; i++){
                elements[i].classList.remove(`${arrSelectors[i]}-light`);
            }

            btnTheme.setAttribute('id', 'dark');
        }
    });
}

replaceTheme(['about-image', 'page', 'page-header', 'container-gallery', 'page-footer', 'container-english', 'page-gallery', 'page-english']);