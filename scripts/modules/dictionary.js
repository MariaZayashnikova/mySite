'use strict';

import getData from './services/getDataService';
import postData from './services/postDataService';
import test from './test';
import { quantityWordInCommonTest, quantityLastWordInTest } from './test';

function showMessage(parent, result) {
    let text = {
        good: "Успешно добавлено!",
        noWord: "Введите русское и английское слова",
        err: "Что-то пошло не так... Попробуйте позже",
        wordTru: 'Такое слово уже есть в словаре',
        errTranslation: 'Ведите перевод слова',
        noComment: 'Введите текст комметария'
    };

    let message = document.createElement('div');
    message.classList.add('message');

    switch (result) {
        case 'good':
            message.textContent = text.good;
            message.style.color = 'green';
            break;
        case 'err':
            message.textContent = text.err;
            break;
        case 'noWord':
            message.textContent = text.noWord;
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

function workDictionary() {

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
        btnStartTestCommon = document.querySelector('#commonTest'),
        btnStartTestLastWords = document.querySelector('#testLastWord'),
        containerAddWord = document.querySelector('.new-words'),
        currentNumPage = 1,
        pageWordsArr = [],
        search = document.querySelector('.search-panel-dictionary input');

    let wordsAll;

    document.querySelector('#commonTest span').textContent = quantityWordInCommonTest;
    document.querySelector('#testLastWord span').textContent = quantityLastWordInTest;

    function createTableFoundElemSearch(elem, parent, language) {
        let container = document.createElement('div');
        let word = document.createElement('span');
        let dash = document.createElement('span');
        let translate = document.createElement('span');

        container.setAttribute('data-id-element', elem.id);

        if (language === 'rus') {
            word.textContent = elem.rus;
            translate.textContent = elem.en;
        } else {
            word.textContent = elem.en;
            translate.textContent = elem.rus;
        }

        dash.textContent = '-';

        let arr = [];
        arr.push(word);
        arr.push(translate);

        arr.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target) {
                    let id = e.target.parentNode.getAttribute('data-id-element');
                    findWordInDictionary(id);

                    document.querySelectorAll('.word-rus').forEach(item => {
                        if (item.textContent == e.target.textContent) {
                            item.style.color = 'rgb(24 21 218)';
                            item.style.fontWeight = 'bold';
                            setTimeout(() => {
                                item.style.color = '';
                                item.style.fontWeight = '';
                            }, 1000);
                        }
                    });
                    document.querySelectorAll('.word-en').forEach(item => {
                        if (item.textContent == e.target.textContent) {
                            item.style.color = 'rgb(24 21 218)';
                            item.style.fontWeight = 'bold';
                            setTimeout(() => {
                                item.style.color = '';
                                item.style.fontWeight = '';
                            }, 1000);
                        }
                    });
                }
            });
        });

        container.append(word);
        container.append(dash);
        container.append(translate);
        parent.append(container);
    }

    function findWordInDictionary(id) {
        let numPage;
        pageWordsArr.forEach((item, i) => {
            item.forEach(elem => {
                if (elem.id === +id) {
                    numPage = i;
                    return;
                }
            });
        });

        clearPage();
        let index = numPage;
        currentNumPage = numPage + 1;
        fillPage(pageWordsArr[index]);
    }

    function searchPanel() {
        search.addEventListener('input', () => {
            let containerPanel = document.querySelector('.panel-foundElem');

            let old = containerPanel.querySelectorAll('div');

            function clearResult() {
                old.forEach(item => {
                    item.remove();
                });
            }

            clearResult();

            let value = search.value.toLowerCase();

            if (value.length === 0) {
                clearResult();
                containerPanel.classList.add('hidden');
                return;
            }
            let language;
            let foundElements = wordsAll.filter(item => {
                let rus = item.rus.toLowerCase();
                let en = item.en.toLowerCase();

                if (rus.indexOf(value) >= 0) {
                    language = 'rus';
                    return true;
                }

                if (en.indexOf(value) >= 0) {
                    language = 'en';
                    return true;
                }
            });

            containerPanel.classList.remove('hidden');

            if (foundElements.length > 0) {
                containerPanel.querySelector('.panel-title').textContent = 'Найдено:';
                foundElements.forEach(item => {
                    createTableFoundElemSearch(item, containerPanel, language);
                });
            } else {
                containerPanel.querySelector('.panel-title').textContent = 'Совпадений нет';
            }
        });
    }

    function fillPage(arr) {
        for (let i = 0; i < arr.length; i++) {
            rusWords[i].textContent = arr[i].rus;
            rusWords[i].setAttribute("data-idWord", arr[i].id);
            enWords[i].textContent = arr[i].en;
            enWords[i].setAttribute("data-idWord", arr[i].id);
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

    function showCastomContextMenu(x, y, id, parent, parentText) {
        if (document.querySelectorAll('.input-word')) {
            document.querySelectorAll('.input-word').forEach(item => {
                item.parentNode.remove();
            });
        }
        let menu = document.querySelector('.custom-context-menu');
        let btnUpdate = menu.querySelector('.update-word');
        let btnDelete = menu.querySelector('.delete-word');
        let btnClose = menu.querySelector('.close-context-menu');
        if(!menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }

        menu.classList.remove('hidden');
        menu.style.top = `${y + 15}px`;
        menu.style.left = `${x + 25}px`;
        menu.setAttribute('data-idWord', id);

        window.addEventListener('click', (e) => {
            if(!menu.classList.contains('hidden') && e.target !== menu) {
                menu.classList.add('hidden');
            }
        });
        
        btnUpdate.addEventListener('click', () => {
            menu.classList.add('hidden');
            showInputForUpdateWord(parent, parentText);
        });

        btnDelete.addEventListener('click', (e) => {
            let obj = {
                'id': e.target.parentNode.getAttribute("data-idWord")
            }
            let json = JSON.stringify(obj);
            postData('http://localhost:5000/deleteWord', json)
                .then(() => {
                    menu.classList.add('hidden');
                    getData('http://localhost:5000/getWords')
                        .then(data => {
                            wordsAll = 0;
                            wordsAll = data;
                            pageWordsArr = [];
                            calculateWordsPage(data, pageWordsArr);
                        })
                        .then(() => {
                            clearPage();
                            let index = currentNumPage;
                            fillPage(pageWordsArr[index - 1]);
                        });
                })
                .catch(() => {
                    showMessage(e.target.parentNode, 'err');
                });
        });

        btnClose.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    }

    function showInputForUpdateWord(parent, text) {
        if (document.querySelectorAll('.input-word')) {
            document.querySelectorAll('.input-word').forEach(item => {
                item.parentNode.remove();
            });
        }
        let form = document.createElement('form');
        let input = document.createElement('input');
        input.classList.add('input-word');
        input.value = text;
        form.append(input);
        input.focus();
        parent.append(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let language;
            if (e.target.parentNode.classList.contains('word-rus')) {
                language = 'rus';
            } else {
                language = 'en';
            }

            let obj = {
                "id": e.target.parentNode.getAttribute('data-idWord'),
                "newValue": input.value,
                "language": language
            }
            let json = JSON.stringify(obj);
            
            postData('http://localhost:5000/changeWord', json)
                .then(() => {
                    showMessage(parent, 'good');
                    form.remove();
                    getData('http://localhost:5000/getWords')
                    .then(data => {
                        wordsAll = 0;
                        wordsAll = data;
                        pageWordsArr = [];
                        calculateWordsPage(data, pageWordsArr);
                    })
                    .then(() => {
                        clearPage();
                        let index = currentNumPage;
                        fillPage(pageWordsArr[index - 1]);
                    });
                })
                .catch(() => {
                    showMessage(form, 'err');
                });
        });
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

                rusWord.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    let id = rusWord.getAttribute('data-idWord');
                    showCastomContextMenu(e.pageX, e.pageY, id, e.target, e.target.textContent);
                });

                let dash = document.createElement('div');
                dash.classList.add('dash');
                parent.append(dash);

                let enWord = document.createElement('div');
                enWord.classList.add('word-en');
                parent.append(enWord);

                enWord.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    let id = enWord.getAttribute('data-idWord');
                    showCastomContextMenu(e.pageX, e.pageY, id, e.target, e.target.textContent);
                });
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
            showMessage(formAddWord, 'noWord');
            return;
        }

        if (inputEn.value && inputRus.value) {
            let enElement = inputEn.value.toLowerCase();
            let rusElement = inputRus.value.toLowerCase();

            for (let i = 0; i < wordsAll.length; i++) {
                let enElementInDB = wordsAll[i].en.toLowerCase();
                let rusElementInDB = wordsAll[i].rus.toLowerCase();

                if (enElement === enElementInDB && rusElement === rusElementInDB) {
                    showMessage(formAddWord, 'wordTru');
                    return;
                }
            }
        }

        let formData = new FormData(formAddWord);
        let json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:5000/postWord', json)
            .then(() => {
                showMessage(formAddWord, 'good');
                getData('http://localhost:5000/getWords')
                    .then(data => {
                        wordsAll = 0;
                        wordsAll = data;
                        pageWordsArr = [];
                        calculateWordsPage(data, pageWordsArr);
                    })
                    .then(() => {
                        clearPage();
                        let index = currentNumPage;
                        fillPage(pageWordsArr[index - 1]);
                        formAddWord.reset();
                        inputRus.focus();
                    })
                    .catch(() => {
                        showMessage(pageLeft, 'err');
                    });
            })
            .catch(() => {
                showMessage(formAddWord, 'err');
            });
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

    btnStartTestCommon.addEventListener('click', () => {
        test('common');
    });

    btnStartTestLastWords.addEventListener('click', () => {
        test('last');
    });

    getData('http://localhost:5000/getWords').then(data => {
        wordsAll = data;
        calculateWordsPage(data, pageWordsArr);
    }).then(() => {
        new createPages(pageWordsArr[0], pageLeft, pageRight);
    }).then(() => {
        fillPage(pageWordsArr[0]);
        searchPanel();
    })
        .catch(() => {
            showMessage(pageLeft, 'err');
        });
}
export default workDictionary;
export { showMessage };