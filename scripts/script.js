import changeTheme from './lightTheme';
import workGallery from './gallery';
import workDictionary from './dictionary';

changeTheme();
let page = document.querySelector('[data-page]').dataset.page;

switch(page) {
    case 'gallery': workGallery();
    break;
    case 'dictionary': workDictionary();
    break;
}


