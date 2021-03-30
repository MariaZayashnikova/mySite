import changeTheme from './modules/lightTheme';
import workGallery from './modules/gallery';
import workDictionary from './modules/dictionary';

changeTheme();
let page = document.querySelector('[data-page]').dataset.page;

switch(page) {
    case 'gallery': workGallery();
    break;
    case 'dictionary': 
        workDictionary();
    break;
}


