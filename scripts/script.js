import changeTheme from './modules/lightTheme';
import workGallery from './modules/gallery';
import workDictionary from './modules/dictionary';
import anim from './modules/animation';

window.addEventListener('DOMContentLoaded', () => {

    
    changeTheme();
    let page = document.querySelector('[data-page]').dataset.page;
    
    switch(page) {
        case 'gallery': 
            workGallery();
            anim();
        break;
        case 'dictionary': 
            workDictionary();
        break;
    }
});




