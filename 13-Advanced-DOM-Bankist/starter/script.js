'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // stops links from sending you to the top of the page
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// working down

// /// // ////// // ////// // ////// // ////// // ///
// // selecting elements
// /// // ////// // ////// // ////// // ////// // ///
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // returns a node list
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// // returns an html collection, a live collection, if the dom changes then this collection is updated automatically
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // creating and inserting elements
// // one  way is using .insertAdjacentHTML
// // which is a quick and easy way to add elements

// const message = document.createElement('div'); // will return a dom element
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got It!</button>';

// // prepend adds it as the first child
// // header.prepend(message);
// // message is a live element of the dom, it can only be in 1 place at a time.
// // calling append here moves the message to the last child
// // header.append(message);

// // what if we wanted several copies?
// // header.append(message.cloneNode(true));

// // will insert before the header element, as a sibling
// // header.before(message);
// // will insert after the header element, as a sibling
// // header.after(message);

// // Delete elements
// document.querySelector('.btn--close--cookie').addEventListener('click', function() {
//   message.remove();
// });

// /// // ////// // ////// // ////// // ////// // ///
// // Styles, attributtes & classes
// /// // ////// // ////// // ////// // ////// // ///

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// // returns empty strings
// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// // so we use this method
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// // we want to increase the height of the msg banner by 40px
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// console.log(message.style.height);

// // we can use js to change CSS variables that affect the whole page

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Atributes
// // Standard, expected properties to be on images
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); // returns absolute path
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non-standard, we must another method
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// // can also set attributes
// logo.setAttribute('company', 'bankist');

// // if we just want the relative src path
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not 'includes' like in arrays

// // don't use as it will overwrite all existing classes
// logo.className = 'Alex'

/// // ////// // ////// // ////// // ////// // ///
// Implementing Smooth Scrolling
/// // ////// // ////// // ////// // ////// // ///

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  // returns the coords in relation to the window
  const s1coords = section1.getBoundingClientRect();
  console.log('s1 coords', s1coords);

  console.log(e.target.getBoundingClientRect());

  // how much the page has been scrolled
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // dimensions of the viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, document.documentElement.clientWidth
  );

  // we need all these to scroll to the first section

  // SCROLLING

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // can make it smooth by passing in an object
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // THE MORE MODERN WAY
  // only works in modern browsers
  section1.scrollIntoView({behavior: 'smooth'});
});

/// // ////// // ////// // ////// // ////// // ///
// Types of Events and Event Handlers
/// // ////// // ////// // ////// // ////// // ///

// const h1 = document.querySelector('h1');

// // can add multiple methods to the same event with this method
// const alertH1 = function(e) {
//   alert('addEventlistener: GREAT! You are reading the heading :D');

//   // removing the event listener so that we can only respond to the event once
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// // can remove the event listner anywhere
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);

// // // more old-school method, can't assign multiple handlers
// // h1.onmouseenter = function(e) {
// //   alert('addEventlistener: GREAT! You are reading the heading :D');
// // };

// /// // ////// // ////// // ////// // ////// // ///
// // Event Propogation in Practice
// /// // ////// // ////// // ////// // ////// // ///

// // rgb(255, 255, 255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   // using this applies to the element that the event listener is attached, in this case being the query selector
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget); // target is where the event happened, same for all 3 events
//   // current target is obvs different for all 3
//   console.log(e.currentTarget === this);

//   // stop propogation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget); // where the event happened

// });

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target), e.currentTarget; // where the event happened

// });

/// // ////// // ////// // ////// // ////// // ///
// Event Propogation in Practice, page navigation
/// // ////// // ////// // ////// // ////// // ///

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e){
//     e.preventDefault(); // stops links from refreshing page
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
//   });
// });

// 1. Add eventListener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault(); // always
  // console.log(e.target); //  can extract section from this

  // Matching stategy
  if (e.target.classList.contains('nav__link')){
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior : 'smooth' });
  }
});

// /// // ////// // ////// // ////// // ////// // ///
// // DOM Traversing
// /// // ////// // ////// // ////// // ////// // ///

// const h1 = document.querySelector('h1');

// // Going downwards, selecting CHILD elements
// // querySelector also works on elements
// console.log('children');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // shows us all child nodes
// console.log(h1.children); // returns a live collection of the elements inside, only for direct children
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: PARENTS
// console.log('parents');
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// // selected the closest header to our h1 element
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Going sideways: siblings
// // retrieves elements
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // if we need all the siblings, return HTML collection
// console.log(h1.parentElement.children);

// // we can iterate through this collection adjusting the styles of all the other siblings
// [...h1.parentElement.children].forEach(function(el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// /// // ////// // ////// // ////// // ////// // ///
// // Building a Tabbed Component
// /// // ////// // ////// // ////// // ////// // ///

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabsContainer.addEventListener('click', function(e){
//   e.preventDefault();

//   if(e.target.classList.contains('operations__tab')){
//     console.log(e.target);
//   }
// });

tabsContainer.addEventListener('click', function(e){
  // search for closest parent tab
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard Clause, if click outside a button
  if (!clicked) return;

  // remove active state from all tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // remove active content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // add active state to currently active tab
  clicked.classList.add('operations__tab--active');
  // add active state to content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// /// // ////// // ////// // ////// // ////// // ///
// // Passing Arguements to Event Handlers
// /// // ////// // ////// // ////// // ////// // ///

// MENU FADE ANIMATION
const nav = document.querySelector('.nav'); // remember to add all of these selections to the top of the file

const handleHover = function(e){
  // not using .closest as there are no child elements i could accidently click here
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link.closest('.nav'));

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// passing an argurment into a handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// /// // ////// // ////// // ////// // ////// // ///
// // Sticky Navigation: Scoll Event
// /// // ////// // ////// // ////// // ////// // ///

// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// window.addEventListener('scroll', function(){
//   // console.log(window);
//   if (window.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// /// // ////// // ////// // ////// // ////// // ///
// // A Better Way: intersectionObserver API
// /// // ////// // ////// // ////// // ////// // ///

// doing the same as before but using the intersection observer API

const obsCallback = function(entries, observer) {
  // will get called each time the observed element is intersecting the root element at the threshold defined
  entries.forEach(entry => console.log(entry));
};

// first needs a root property - the element that the target is intersecting
// The theshold, the percentage of intersection that which the callback will be called
// when using the threshold value 0, the callback will be called each time the target element moves completely out of the view, and completely in
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

// create a new observer object, takes a callback and an object for its options
const observer = new IntersectionObserver(obsCallback, obsOptions);
// we use the observer to observe a certain target

// observer.observe(section1); 
// will be triggered when 10% of the viewport is taken up by section1

// when do we want out nav to become sticky?
// when header is completely out of view
// select the header
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries){
  const [entry] = entries;
  // the same as writine = entries[0]
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// rootmargin specifies how many pixels will be applied outside of our target element
// means nav will become sticky 90px before threshold is reached, i think
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// /// // ////// // ////// // ////// // ////// // ///
// // Revealing Elements on Scroll
// /// // ////// // ////// // ////// // ////// // ///

// we will remove the class section--hidden from the sections as we scroll down the page

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

// root: null means the root is the viewport
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// /// // ////// // ////// // ////// // ////// // ///
// // Lazy Loading Images
// /// // ////// // ////// // ////// // ////// // ///

// we select all img cases where there is a data-src property
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// /// // ////// // ////// // ////// // ////// // ///
// // Building a Slider Component
// /// // ////// // ////// // ////// // ////// // ///
// store the everything in its own function, so that we dn't pollute the global namespace

const slider = function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.2) translateX(-1200px)';
  // slider.style.overflow = 'visible';

  const createDots = function() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    // can use the [] to search for a certain attribute
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const goToSlide = function(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const init = function(){
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  // Next slide
  const nextSlide = function(){
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    activateDot(currentSlide);
    goToSlide(currentSlide);
  };

  const prevSlide = function() {
    if(currentSlide === 0){
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    activateDot(currentSlide);
    goToSlide(currentSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e) {
    // console.log(e);

    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function(e){
    if (e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);

    }
  })
};
slider();
// we can even have our slider accept options as a parameter, eg in the form of an object

// /// // ////// // ////// // ////// // ////// // ///
// // Lifecycle DOM Events
// /// // ////// // ////// // ////// // ////// // ///

document.addEventListener('DOMContentLoaded', function(e) {
  // it takes time to load the DOM as seen in the network tab
  console.log('HTML parsed and DOM tree built!', e);
  // we only want to execute code after the DOM is ready
  // so we add the script tag to the HTML at the end of the html document
});

// Can also check for when the page is fully loaded
window.addEventListener('load', function(e) {
  console.log('Page fully loaded', e);
});

// // check if the user wants to leave the page, prompts when the user tries to leave
// window.addEventListener('beforeunload', function(e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

// /// // ////// // ////// // ////// // ////// // ///
// // Efficent Scrpit Loading
// /// // ////// // ////// // ////// // ////// // ///

// We have regular, async and defer

// Never put the script in the head, put it at the end of the body

// ASYNC - scrupt gets loaded with the html asynchronously then executed when it is finished loading, pausing the html parsing

// DOMcontentloaded ignores async scripts
// scripts are not guaranteed to execute in order

// DEFER - HTML parsing is never interrupted as the script is only executed at the end

// scripts are executed in order

