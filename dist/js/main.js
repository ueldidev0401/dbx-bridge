"use strict";

// function select() {
//   var items = document.querySelectorAll('.select');
//   if (!items.length) return;
//   console.log(12312312);
//   var className = 'select-btn--opened';
//   var btns = document.querySelectorAll('.select-btn');
//   var dropdownSelectAll = document.querySelectorAll('.select-dropdown');
//   items.forEach(function (item) {
//     var dropdown = item.querySelector('.select-dropdown');
//     var btn = item.querySelector('.select-btn');
//     var inputs = item.querySelectorAll('.select-label__input');
//     var outputImg = item.querySelector('.select-btn__output-img img');
//     var outputTxt = item.querySelector('.select-btn__output-txt');
//     btn.addEventListener('click', function (e) {
//       e.preventDefault();
//       var etClassList = e.target.closest('.select-btn').classList;
//       var is_on = etClassList.contains(className);
//       btns.forEach(function (el) {
//         return el.classList.remove(className);
//       });
//       dropdownSelectAll.forEach(function (i) {
//         i.classList.remove('d-block');
//         i.classList.remove('d-animate');
//       });

//       if (!is_on) {
//         etClassList.add(className);
//         dropdown.classList.add('d-block');
//         setTimeout(function () {
//           dropdown.classList.add('d-animate');
//         });
//       }
//     });
//     inputs.forEach(function (input) {
//       input.addEventListener('change', function () {
//         var img = this.dataset.img;
//         var txt = this.dataset.value;
//         btn.classList.remove(className);
//         dropdown.classList.remove('d-block', 'd-animate');
//         item.classList.add('select--active');
//         outputImg.setAttribute('src', img);
//         outputTxt.textContent = txt;
//       });
//     });
//   });
//   document.addEventListener('click', function (e) {
//     if (e.target.closest('.select') === null) {
//       dropdownSelectAll.forEach(function (i) {
//         i.classList.remove('d-block');
//         i.classList.remove('d-animate');
//       });
//       btns.forEach(function (el) {
//         return el.classList.remove(className);
//       });
//     }
//   });
// }

// select();

function showModal() {
  var btn = document.querySelector('.header__link');
  if (!btn) return;
  var content = document.querySelector('.connect-modal');
  var overlay = document.querySelector('.connect-modal__overlay');
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    content.classList.add('connect-modal--active');
  });
  overlay.addEventListener('click', function (e) {
    e.preventDefault();
    content.classList.remove('connect-modal--active');
  });
}

showModal();