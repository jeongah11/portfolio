'use strict';

//navbar scroll 이벤트
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

/* Navbar Scroll */
/* document.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  console.log(document.documentElement.scrollTop);
  if(document.documentElement.scrollTop == 0) {
    navbar.classList.remove('scroll');
  } else if (document.documentElement.scrollTop > 0) {
    navbar.classList.add('scroll');
  }
}); */
