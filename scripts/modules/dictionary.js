'use strict';

import anime from 'animejs/lib/anime.es.js';
import getData from './services/getDataService';
import postData from './services/postDataService';
import test from './test';

function showMessage (parent, result) {
    let text = {
        good: "Успешно добавлено!",
        err: "Введите русское и английское слова",
        wordTru: 'Такое слово уже есть в словаре',
        errTranslation: 'Ведите перевод слова',
        noComment: 'Введите текст комметария'
    };

    let message = document.createElement('div');
    message.classList.add('message');
    
    switch(result) {
        case 'good': 
            message.textContent = text.good;
            break;
        case 'err':
            message.textContent = text.err;
            break;
        case 'wordTru':
            message.textContent = text.wordTru;
            break;
        case 'errTranslation':
            message.textContent = text.errTranslation;
            break;
        case 'noComment':
            message.textContent = text.noComment;
            break;
    }

    parent.append(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

function workDictionary () {

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
        pageWordsArr = [],
        urlDictionary = 'http://localhost:3000/words';

    let wordsAll;

    function fillPage(arr) {
        for (let i = 0; i < arr.length; i++) {
            rusWords[i].textContent = arr[i].rus;
            enWords[i].textContent = arr[i].en;
            dash[i].textContent = "-";
        }

        showNumPage();
    }

    function calculateWordsPage(origArr, newArr) {
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
    };

    function clearPage() {
        for (let i = 0; i < rusWords.length; i++) {
            rusWords[i].textContent = "";
            enWords[i].textContent = "";
            dash[i].textContent = "";
        }
    }

    function showNumPage() {
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

        createContainersWords(parent) {
            for (let i = 0; i < this.words.length / 2; i++) {
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

    btnNext.addEventListener('click', () => {
        if (currentNumPage === pageWordsArr.length) {
            return;
        }
        currentNumPage++;
        let index = currentNumPage;
        clearPage();
        fillPage(pageWordsArr[index - 1]);
    });

    btnBack.addEventListener('click', () => {
        if (currentNumPage === 1) {
            return;
        }
        currentNumPage--;
        let index = currentNumPage;
        clearPage();
        fillPage(pageWordsArr[index - 1]);
    });

    formAddWord.addEventListener('submit', event => {
        event.preventDefault();
        let inputRus = formAddWord.querySelector('#rus');
        let inputEn = formAddWord.querySelector('#en');

        if (!inputRus.value || !inputEn.value) {
            showMessage(formAddWord, 'err');
            return;
        }

        if (inputEn.value) {
            let enElement = inputEn.value.toLowerCase();

            for (let i = 0; i < wordsAll.length; i++) {
                let enElementInDB = wordsAll[i].en.toLowerCase();

                if (enElement === enElementInDB) {
                    showMessage(formAddWord, 'wordTru');
                    return;
                }
            }
        }

        let formData = new FormData(formAddWord);
        let json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData(urlDictionary, json).then(() => {
            showMessage(formAddWord, 'good');

            getData(urlDictionary).then(data => {
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

        if (dictionary.classList.contains('hidden')) {
            btnMode.textContent = 'Словарь';
        } else {
            btnMode.textContent = 'Пройти тест';
        }
    });

    btnStartTest.addEventListener('click', () => {
        test();
    });

    function showAnimation() {
        let current = null;
        document.querySelector('#rus').addEventListener('focus', function (e) {
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
        document.querySelector('#en').addEventListener('focus', function (e) {
            if (current) { current.pause(); }
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
    }

    getData(urlDictionary).then(data => {
        wordsAll = data;
        calculateWordsPage(data, pageWordsArr);
    }).then(() => {
        new createPages(pageWordsArr[0], pageLeft, pageRight);
    }).then(() => {
        fillPage(pageWordsArr[0]);
    });

    showAnimation();

}
export default workDictionary;
export {showMessage};