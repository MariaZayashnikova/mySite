'use strict';

let gallery = document.querySelector('.gallery');
let images = document.querySelectorAll('.flex .image');
let templateModal = document.querySelector('#modal').content;

let commentsAll;

async function getDataComments () {
    let res = await fetch('http://localhost:3000/comments');

    return await res.json();
}

async function postData (data) {
    let res = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: data
    });

    if(!res.ok){
        throw new Error(`Error. Status: ${res.status}`);
    }

    return await res.json();
}

function showComments (comments, image, parent) {
    let j = 0;
    for (let i = 0; i < comments.length; i++) {
        if(comments[i].image === image){
            let newComment = document.querySelector('#newComment').content;
            let newComent = newComment.querySelector('.comment').cloneNode(true);
            
            newComent.querySelector('.author').textContent = comments[i].author;
            newComent.querySelector('.dateComment').textContent = comments[i].dateComment;
            newComent.querySelector('.commentText').textContent = comments[i].commentText;

            parent.after(newComent);

            j += 1;
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

function openModal (image, src, alt, comments) {
    let modal = templateModal.querySelector('.modal').cloneNode(true);
    let img = modal.querySelector('img');
    let parent = modal.querySelector('.comment-stat');
    let btnClose = modal.querySelector('.modal__close');
    let btnAddComment = modal.querySelector('.add-comment');
    let form = modal.querySelector('.new-comment-form');

    img.src = src;
    img.alt = alt;
    img.setAttribute('id', image);
    
    showComments(comments, image, parent);
    gallery.append(modal);

    btnClose.addEventListener('click', () => {
        modal.remove();
    });
    btnAddComment.addEventListener('click', (event) => {
        event.preventDefault();

        let formData = new FormData(form);
        let data = Object.fromEntries(formData.entries());
        data.image = image;

        let currDate = new Date();
        let year = currDate.getFullYear();
        let month = currDate.getMonth() + 1;
        let day = currDate.getDate();

        data.dateComment = `${day}-${month}-${year}`;

        postData(JSON.stringify(data))
        .then(() => {
            let message = document.createElement('div');
            message.classList.add('modal-message');
            message.textContent = 'Ваш комментарий успешно добавлен!';
            btnAddComment.after(message);
            form.reset();

            let timerId = setTimeout(() => {
                message.remove();
            }, 1500);

            commentsAll = [];
            getDataComments().then(data => {
                commentsAll = data;
            }).then(() => { 
                document.querySelectorAll('.comments .comment').forEach(comment => {
                    comment.remove();
                });
                document.querySelector('.comments .no-comments').remove();
                let idImage = document.querySelector('.modal .image').getAttribute('id');
                let parent = document.querySelector('.comment-stat');
                showComments(commentsAll, idImage, parent);
            });
        });
    });
}

images.forEach(image => {
    image.addEventListener('click', (event) => {
        let idImage = event.target.getAttribute('id'),
            srcImage = event.target.getAttribute('src'),
            altImage = event.target.getAttribute('alt');
        getDataComments().then(data =>{
            commentsAll = data;
        }).then(() => openModal(idImage, srcImage, altImage, commentsAll));
    });
});

