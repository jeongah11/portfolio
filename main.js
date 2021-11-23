'use strict';

//scroll 시 navbar style 변경
const navbar = document.querySelector('#navbar');
// const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > 0) {
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

//Home 'Contact Me' button
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

//Home 콘텐츠 scroll 시 투명 효과
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const homeContent = document.querySelector('.home__container');
document.addEventListener('scroll', () => {
  homeContent.style.opacity = 1 - window.scrollY / homeHeight;
});

//Works filtering
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projets = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter ==null) {
    return;
  }

  //전체 버튼 active 지운 후 선택한 버튼 aictive 처리
  const active = document.querySelector('.category__btn.active');
  active.classList.remove('active');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; // button 안의 span 클릭했을 경우 처리
  target.classList.add('active');

  projectContainer.classList.add('anim-out'); //filtering 시작 project 사라지는 ani
  setTimeout(() => {
    //클릭한 버튼과 일치하는 data-type filter
    projets.forEach((project) => {
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');//filtering 후 project 나타남
  }, 300);
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


//해당 selector로 scroll 이동
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}