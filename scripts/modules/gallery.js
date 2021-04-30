import { showMessage } from './dictionary';
import { findElements, activeLightTheme } from './lightTheme';
import { getRandomNum } from './test';
import getData from './services/getDataService';
import postData from './services/postDataService';

function workGallery() {

    let gallery = document.querySelector('.gallery'),
        images = document.querySelectorAll('.flex .image'),
        templateModal = document.querySelector('#modal').content;

    let commentsAll;

    function showComments(comments, image, parent, startIndex = 0) {
        let j = startIndex;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].image === image) {
                if (j === 5) {
                    let newComment = document.querySelector('#newComment').content;
                    let newComent = newComment.querySelector('.comment').cloneNode(true);
                    newComent.textContent = 'Показать все комментарии';
                    newComent.classList.add('show-all-comments');
                    parent.append(newComent);
                    newComent.addEventListener('click', () => {
                        document.querySelectorAll('.comment').forEach(item => {
                            item.remove();
                        });
                        showComments(comments, image, parent, 6);
                    });
                    break;

                } else {
                    let newComment = document.querySelector('#newComment').content;
                    let newComent = newComment.querySelector('.comment').cloneNode(true);

                    newComent.querySelector('.author').textContent = comments[i].author;
                    newComent.querySelector('.dateComment').textContent = comments[i].dateComment;
                    newComent.querySelector('.commentText').textContent = comments[i].commentText;

                    let r = getRandomNum(0, 360);
                    let g = getRandomNum(0, 360);
                    let b = getRandomNum(0, 360);
                    newComent.querySelector('.avatar').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

                    parent.append(newComent);

                    j += 1;
                }

            } else {
                j += 0;
            }
        }

        if (j == 0) {
            let noCom = document.createElement('li');
            noCom.classList.add('no-comments');
            noCom.textContent = 'Нет комментариев...';
            parent.after(noCom);
        }
    }

    function correctNumForYear(num) {
        if (num < 10) {
            num = `0${num}`;
        }

        return num;
    }

    function openModal(image, src, alt, comments) {
        let modal = templateModal.querySelector('.modal').cloneNode(true),
            img = modal.querySelector('img'),
            parent = modal.querySelector('.comment-stat'),
            btnClose = modal.querySelector('.modal__close'),
            btnAddComment = modal.querySelector('.add-comment'),
            form = modal.querySelector('.new-comment-form');

        img.src = src;
        img.alt = alt;
        img.setAttribute('id', image);

        showComments(comments, image, parent);
        gallery.append(modal);

        let currTheme = localStorage.getItem('theme');
        if (currTheme === 'light') {
            let obj = findElements(['container-modal', 'comments', 'input-author', 'new-comment']);
            activeLightTheme(obj.Elements, obj.Classes);
        }

        btnClose.addEventListener('click', () => modal.remove());

        document.addEventListener('keydown', (event) => {
            if (event.code == 'Escape' && document.querySelector('.modal')) {
                modal.remove();
            }
        });

        modal.addEventListener('click', (e) => {
            let target = e.target;

            if (target && target.classList.contains('modal')) {
                modal.remove();
            }
        });

        btnAddComment.addEventListener('click', (event) => {
            event.preventDefault();

            if (!form.querySelector('.new-comment').value) {
                showMessage(form.querySelector('.comment-stat'), 'noComment');
            } else {
                if (!form.querySelector('.input-author').value) {
                    form.querySelector('.input-author').value = 'Anonymous';
                }

                let formData = new FormData(form);

                let data = Object.fromEntries(formData.entries());
                data.image = image;

                let currDate = new Date();
                let year = currDate.getFullYear();
                let month = correctNumForYear(currDate.getMonth() + 1);
                let day = correctNumForYear(currDate.getDate());

                data.dateComment = `${day}-${month}-${year}`;

                postData('http://localhost:5000/postComment', JSON.stringify(data))
                    .then((data) => {
                        showMessage(form, 'good');
                        form.reset();

                        commentsAll = [];
                        getData('http://localhost:5000/getComments')
                            .then(data => {
                                commentsAll = data;
                                commentsAll.reverse();
                            })
                            .then(() => {
                                let check = document.querySelector('.show-all-comments');
                                document.querySelectorAll('.comments .comment').forEach(comment => {
                                    comment.remove();
                                });
                                if (document.querySelector('.comments .no-comments')) {
                                    document.querySelector('.comments .no-comments').remove();
                                }
                                let idImage = modal.querySelector('.image').getAttribute('id');
                                let parent = modal.querySelector('.comment-stat');
                                if (check) {
                                    console.log('усть кпонка');
                                    showComments(commentsAll, idImage, parent);
                                } else {
                                    showComments(commentsAll, idImage, parent, 6);
                                }
                            })
                            .catch(() => {
                                showMessage(parent, 'err');
                            });
                    })
                    .catch(() => {
                        showMessage(form, 'err');
                    });
            }
        });

    }

    images.forEach(image => {
        image.addEventListener('click', (event) => {
            let idImage = event.target.getAttribute('id'),
                srcImage = event.target.getAttribute('src'),
                altImage = event.target.getAttribute('alt');
            getData('http://localhost:5000/getComments')
                .then(data => {
                    commentsAll = data;
                    commentsAll.reverse();
                })
                .then(() => openModal(idImage, srcImage, altImage, commentsAll))
                .catch(() => {
                    showMessage(image.parentNode, 'err');
                });
        });
    });
}
export default workGallery;
