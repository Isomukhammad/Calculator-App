const webBody = document.querySelector('body')
const theme1 = document.querySelector('#first-theme');
const theme2 = document.querySelector('#second-theme');
const theme3 = document.querySelector('#third-theme');
const toggle = document.querySelector('#circle');

theme1.addEventListener('click', function(){
    toggle.style.left = '0.2em'; 

    webBody.classList.add('t1');
    webBody.classList.remove('t2');
    webBody.classList.remove('t3');
});

theme2.addEventListener('click', function(){
    toggle.style.left = '0.95em';

    webBody.classList.add('t2');
    webBody.classList.remove('t1');
    webBody.classList.remove('t3');
});

theme3.addEventListener('click', function(){
    toggle.style.left = '1.75em';

    webBody.classList.add('t3');
    webBody.classList.remove('t1');
    webBody.classList.remove('t2');
})