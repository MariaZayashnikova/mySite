import anime from 'animejs/lib/anime.es.js';
import test from './test';

let wordsAll;

function showMessage (parent, result) {
    let text = {
        good: "Успешно добавлено!",
        err: "Введите русское и английское слова",
        wordTru: 'Такое слово уже есть в словаре',
        errTranslation: 'Ведите перевод слова'
    };

    let message = document.createElement('div');
    message.classList.add('message');
    
    switch(result) {
        case 'good': 
            message.textContent = text.good;
            parent.append(message);
            break;
        case 'err':
            message.textContent = text.err;
            parent.after(message);
            break;
        case 'wordTru':
            message.textContent = text.wordTru;
            parent.after(message);
            break;
        case 'errTranslation':
            message.textContent = text.errTranslation;
            parent.after(message);
            break;
    }
    
    let timerId = setTimeout(() => {
        message.remove();
    }, 3000);
}

function workDictionary () {
'use strict';

let btnBack = document.querySelector('.navigation-back'),
    btnNext = document.querySelector('.navigation-next'),
    numPage = document.querySelector('.num-page-dictionary'),
    pageLeft = document.querySelector('.pages-dictionary-left'),
    pageRight = document.querySelector('.pages-dictionary-right'),
    dictionary = document.querySelector('.container-dictionary'),
    dash = dictionary.getElementsByClassName('dash'),
    rusWords = dictionary.getElementsByClassName('word-rus'),
    enWords = dictionary.getElementsByClassName('word-en'),
    formAddWord = document.querySelector('.form-new-words'),
    btnMode = document.querySelector('.variation .mode'),
    containerTest = document.querySelector('.container-test'),
    btnStartTest = document.querySelector('.start-test'),
    containerAddWord = document.querySelector('.new-words'),
    currentNumPage = 1,
    pageWordsArr = [];

function fillPage (arr) {
    for (let i = 0; i < arr.length; i++){
        rusWords[i].textContent = arr[i].rus;
        enWords[i].textContent = arr[i].en;
        dash[i].textContent = "-";
    }
    showNumPage();
}

function calculateWordsPage (origArr, newArr) {
    let page = [];
    for (let i = 0; i < origArr.length; i++) {
       if (page.length === 12) {
        newArr.push(page);
        page = [];
       }
       page.push(origArr[i]);
    }
    if (page.length > 0) {
        newArr.push(page);
    }
}

function clearPage () {
    for(let i = 0; i < rusWords.length; i++){
    rusWords[i].textContent = "";
    enWords[i].textContent = "";
    dash[i].textContent = "";
    }
}

function showNumPage () {
    numPage.textContent = currentNumPage;
}

class createPages {
    constructor(arr, parentLeftPage, parentRightPage) {
        this.words = arr;
        this.parentLeftPage = parentLeftPage;
        this.parentRightPage = parentRightPage;
        this.createContainersWords(this.parentLeftPage);
        this.createContainersWords(this.parentRightPage);
    }

    createContainersWords (parent) {
        for (let i = 0; i < this.words.length / 2; i++){
        let rusWord = document.createElement('div');
        rusWord.classList.add('word-rus');
        parent.append(rusWord);

        let dash = document.createElement('div');
        dash.classList.add('dash');
        parent.append(dash);

        let enWord = document.createElement('div');
        enWord.classList.add('word-en');
        parent.append(enWord);
        }
    }
}

let getDataDictionary = async () => {
    let res = await fetch('http://localhost:3000/words');

    if (!res.ok) {
        throw new Error(`Error. Status: ${res.status}`);
    }

    return await res.json();
};

let postData = async (data) => {
    let res = await fetch('http://localhost:3000/words', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    if(!res.ok){
        throw new Error(`Error. Status: ${res.status}`);
    }

    return await res.json();
};

btnNext.addEventListener('click', () => {
    if(currentNumPage === pageWordsArr.length){
        return;
    }
    currentNumPage++;
    let index = currentNumPage;
    clearPage();
    fillPage(pageWordsArr[index - 1]);
});

btnBack.addEventListener('click', () => {
    if(currentNumPage === 1){
        return;
    }
    currentNumPage--;
    let index = currentNumPage;
    clearPage();
    fillPage(pageWordsArr[index -1]);
});

formAddWord.addEventListener('submit', event => {
    event.preventDefault();
    let inputRus = formAddWord.querySelector('#rus');
    let inputEn = formAddWord.querySelector('#en');

    if(!inputRus.value || !inputEn.value) {
        showMessage(inputEn, 'err');
        return;
    } 

    if(inputRus.value) {
        let rusElement = inputRus.value.toLowerCase();

        for (let i = 0; i < wordsAll.length; i++) {
            let rusElementInDB = wordsAll[i].rus.toLowerCase();

            if(rusElement === rusElementInDB) {
                 showMessage(inputEn, 'wordTru');
                return;
            }
        }
    }

    let formData = new FormData(formAddWord);
    let json = JSON.stringify(Object.fromEntries(formData.entries()));
    
        postData(json).then(() => {
            showMessage(formAddWord, 'good');
    
            getDataDictionary().then(data => {
                wordsAll = 0;
                wordsAll = data;
                pageWordsArr = [];
                calculateWordsPage(data, pageWordsArr);
            }).then(() => {
                clearPage();
                let index = currentNumPage;
                fillPage(pageWordsArr[index - 1]);
            });
        });
    
        formAddWord.reset();

});

btnMode.addEventListener('click', () => {
    dictionary.classList.toggle('hidden');
    containerTest.classList.toggle('hidden');
    containerAddWord.classList.toggle('hidden');

    if(dictionary.classList.contains('hidden')) {
        btnMode.textContent = 'Словарь';
    } else {
        btnMode.textContent = 'Пройти тест';
    }
});

btnStartTest.addEventListener('click', () => {
    test();
});

getDataDictionary().then(data => {
    wordsAll = data;
    calculateWordsPage(data, pageWordsArr);
}).then(() => {
    new createPages(pageWordsArr[0], pageLeft, pageRight);
}).then(() => {
    fillPage(pageWordsArr[0]);
});

let current = null;
document.querySelector('#rus').addEventListener('focus', function(e) {
  if (current) {
      current.pause();
    }
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
document.querySelector('#en').addEventListener('focus', function(e) {
  if (current) {current.pause();} 
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
document.querySelector('.add-word').addEventListener('focus', function(e) {
  if (current) {current.pause();}
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -730,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '530 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});

}
export default workDictionary;
export {wordsAll};
export {showMessage};