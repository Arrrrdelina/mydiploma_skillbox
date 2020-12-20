const slider = document.querySelector('.swiper-container');

let mySwiper = new Swiper (slider, {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

	breakpoints: {

    320: {
      slidesPerView: 1,
    },

    575: {
      slidesPerView: 1,
    },

    900: {
      slidesPerView: 2.
    },

		1024: {
			slidesPerView: 2,
        spaceBetween: 10,
   			
		},
		1119: {
			slidesPerView: 3,
    		spaceBetween: 10,
		}
	}
  
 });

//------------------------МОБИЛЬНОЕ МЕНЮ 

const menu = document.querySelector('.mobile__menu'),
  burger = document.querySelector('.burger'),
  mobileBack = document.querySelector('.mobile-back'),
  overlay = document.querySelector('.header__overlay');
  
  
const lockScroll = () => {
  document.body.classList.add('.lock');
}

const unlockScroll = () => {
  document.body.classList.remove('.lock');
}

burger.addEventListener('click', () => {  //34я минутка видоса если что
  menu.classList.add('open');
  overlay.classList.add('open');
  lockScroll();
  console.log(burger)
});

overlay.addEventListener('click', () => {
  menu.classList.remove('open');
  overlay.classList.remove('open');
  unlockScroll();
});






//------------------------ПЛАВНЫЙ ПЕРЕХОД ПО ПУНКТАМ МЕНЮ

const anchors = document.querySelectorAll('nav a');



function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop -  //прокрутка - offsetTop
    document.querySelector('.nav').clientWidth + 400, //с помощью прибавления добавили больше прокрутки

  });
}

anchors.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(anchors)

    menu.classList.remove('open');

    let id = e.currentTarget.getAttribute('href');
    overlay.classList.remove('open');

    scrollTo(document.querySelector(id))
  });
});




//-----------------ДЛЯ МОДАЛЬНОГО ОКНА





//----------------------------------------МОДАЛЬНОЕ ОКОШКО

const btns = document.querySelectorAll('.btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const body = document.body;
const elements = document.querySelectorAll('.js-validate-error-label');

const modalbt = document.querySelector('.modal__button');
const send = document.querySelector('.send');
const modalwindow = document.querySelector('.form');

//-----

function disableScroll() {
  let pagePosition = window.scrollY;
  body.classList.add('disable-scroll');
  body.dataset.position = pagePosition;
  body.style.top = -pagePosition + 'px';

}

function enableScroll() {
  let pagePosition = parseInt(body.dataset.position, 10);
  body.style.top = 'auto';
  body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0});
  body.removeAttribute('data-position');
  
}




btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    disableScroll();
    document.querySelector('.form').reset();
    
    let path = e.currentTarget.getAttribute('data-path');

    modals.forEach((el) => {
      el.classList.add('modal--visible');
    });
    send.classList.remove('send--visible');

    elements.forEach( el => {
        form_modal.removeAttribute('style');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
    
  });
});

modalOverlay.addEventListener('click', (e) => {
    enableScroll();

    if (e.target == modalOverlay) {

      e.target.querySelector('.form').querySelectorAll('input').forEach(el => {
        el.removeAttribute('style');
      });

      e.target.querySelector('.form').querySelectorAll('.js-validate-error-label').forEach(el => {
        el.remove()
      });

      modalOverlay.classList.remove('modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });

      send.classList.remove('send--visible');
      
    };

  });





//

//inputMask
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

//validate 
function validateForms(selector, rules) {
  new window.JustValidate(selector, {
    rules: rules,
    submitHandler: function (form, values, ajax) {
      console.log(form);

      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200){
            console.log('Отправлено'); 
            
            modals.forEach((el) => {
            	el.classList.remove('modal--visible');
						});
						send.classList.add('send--visible');

            
          }
        }
      }


      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
      disableScroll();
      form.reset();
      
    }
  });
}

validateForms('.form', { email: { required: true, email: true }, fio: { required: true }, tel: { required: true } });






