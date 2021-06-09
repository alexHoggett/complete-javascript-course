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

