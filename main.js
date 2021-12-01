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
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// navbar toggle button (mobile)
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', (e) => {
  navbarMenu.classList.toggle('open');
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


// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
const sectionIds = ['#home', '#about', '#skills', '#works'/* , '#testimonials' */, '#contact'];
const sections = sectionIds.map(id => document.querySelector(id)); //배열을 map으로 돌리기
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(seleted) {
  selectedNavItem.classList.remove('active')
  selectedNavItem = seleted;
  selectedNavItem.classList.add('active');
}

//해당 selector로 scroll 이동
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      //스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else { //스크롤링이 위로 되어서 페이지가 내려감
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// scroll은 윈도우에서 실행하는 모든 scroll을 인식하지만 wheel은 사용자가 마우스 휠을 사용했을 때 인식
window.addEventListener('wheel', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if(window.scrollY + window.innerHeight === document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});