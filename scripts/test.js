import {wordsAll} from './dictionary';

function test () {

    const containerStart = document.querySelector('.test-start'),
          formTest = document.querySelector('.form-test'),
          statWord = document.querySelector('.stat-word'),
          userWord = document.querySelector('.user-word'),
          btnCheck = document.querySelector('.check');

    let newWordsArr = [];

    containerStart.classList.add('hidden');
    formTest.classList.remove('hidden');

    function getRandomNum (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createWordsCollection (originalArr) {
        for (let i = 0; i < 10; i++){
            let num = getRandomNum(0, originalArr.length);
            let element = wordsAll[num];
            if(newWordsArr.some(word => word.id === element.id)){
                i--;
            } else {
                newWordsArr.push(element);
            }
        }
    }
    
    function startTest () {
        let i = 0;
        createWordsCollection(wordsAll);

        function showWord () {
            if (i % 2) {
                statWord.textContent = newWordsArr[i].rus;
            } else {
                statWord.textContent = newWordsArr[i].en;
            }
        }

        showWord();
        btnCheck.addEventListener('click', () => {
            if (!userWord.value) {
                alert('ошибка');
            } else {
                i++;
                showWord();
            }
        });


    }

    startTest();

}
export default test;

