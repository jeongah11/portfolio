'use strict';

//scroll 시 navbar style 변경
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//navbar 클릭 시 scroll 이동 이벤트
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

//#home 'Contact Me' button
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

//#home 콘텐츠 scroll 시 투명 효과
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const homeContent = document.querySelector('.home__container');
document.addEventListener('scroll', () => {
  homeContent.style.opacity = 1 - window.scrollY / homeHeight;
});

//toppage 이동 button
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight/2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});


function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}
