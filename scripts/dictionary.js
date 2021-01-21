import anime from 'animejs/lib/anime.es.js';
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
    currentNumPage = 1,
    wordsAll =[];

function fillPage (arr) {
    for (let i = 0; i < arr.length; i++){
        rusWords[i].textContent = arr[i].rus;
        enWords[i].textContent = arr[i].en;
        dash[i].textContent = "-";
    }
    showNumPage();
}

function calculateWordsPage (arr) {
    let page = [];
    for (let i = 0; i < arr.length; i++) {
       if (page.length === 12) {
        wordsAll.push(page);
        page = [];
       }
       page.push(arr[i]);
    }
    if (page.length > 0) {
        wordsAll.push(page);
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
    if(currentNumPage === wordsAll.length){
        return;
    }
    currentNumPage++;
    let index = currentNumPage;
    clearPage();
    fillPage(wordsAll[index - 1]);
});

btnBack.addEventListener('click', () => {
    if(currentNumPage === 1){
        return;
    }
    currentNumPage--;
    let index = currentNumPage;
    clearPage();
    fillPage(wordsAll[index -1]);
});

formAddWord.addEventListener('submit', event => {
    event.preventDefault();

    let formData = new FormData(formAddWord);
    let json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData(json).then(() => {
        let message = document.createElement('div');
        message.textContent = "Успешно добавлено!";
        formAddWord.append(message);

        let timerId = setTimeout(() => {
            message.remove();
        }, 3000);
        getDataDictionary().then(data => {
            wordsAll = [];
            calculateWordsPage(data);
        }).then(() => {
            clearPage();
            let index = currentNumPage;
            fillPage(wordsAll[index - 1]);
        });
    });

    formAddWord.reset();
    
});

getDataDictionary().then(data => {
    calculateWordsPage(data);
}).then(() => {
    new createPages(wordsAll[0], pageLeft, pageRight);
}).then(() =>{
    fillPage(wordsAll[0]);
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