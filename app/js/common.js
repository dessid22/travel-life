$(document).ready(function(){

	$('.follow__box').jScrollPane({ //На какой элемент задаем прокрутку
		showArrows: true //показать стрелки
	});

	$('.to-top').click(function() { // Скролл наверх
		$("html, body").animate({scrollTop: 0}, "slow");
		// .animate() - произвольная анимация набора CSS свойств
		return false;
		// return false - для остановки распространения 
		// события .click() на другие элементы
	});

	// Анимация Skill bar
	// При скроллинге до .stats выполнить:
	$(".stats").waypoint(function() {
		$('.info__number').easyPieChart({ // Анимация skill bar
           size: 150,
           barColor: '#ffa800',
           trackColor: '#7f7f7f',
           scaleColor: false, // !отмена внешней обводки
           scaleLength: '0', // !отмена внешней обводки
           lineWidth: '5',
           lineCap: 'circle',
           animate: { duration: 4000, enabled: true }
        });
	}, {
		offset:"80%"
	}
	);

	// Настройки .slider
	$(".slider").owlCarousel({
		margin: 100,
		nav: true,
		navText: [
			'<i class="fas fa-chevron-left"></i>',
			'<i class="fas fa-chevron-right"></i>'
			],
		loop: false,
		dots: false,
		smartSpeed: 700,
		fluidSpeed: 700,
		navSpeed: 700,
		dotsSpeed: 700,
		dragEndSpeed: 700,
		responsiveClass:true,
    	responsive:{
        	0:{
            	items:1
        	},
        	768:{
            	items:1
        	},
        	992:{
            	items:1
        	},
        	1200:{
            	items:1
        	}
    	}
	});

	$(".basic-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php", //Change
			data: th.serialize()
		}).done(function() { // После отправки данных выполнить ф-ии:
			// Выводим сообщение об успешной отправке
			$(".basic-form__message").addClass("basic-form__message_success");
			setTimeout(function() {
				// Удаляем сообщение об успешной отправке через 2000 мс
				$(".basic-form__message").removeClass("basic-form__message_success");
				// Сбрасываем значения полей через 2000 мс
				th.trigger("reset");
				// Закрываем magnificPopup через 2000 мс
				// var magnificPopup = $.magnificPopup.instance;
				// magnificPopup.close();
			}, 2000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	$('.preloader').fadeOut();
});

	(function() { // Анимация таймлайна

	  // VARIABLES
	  const timeline = document.querySelector(".timeline__list"),
	    elH = document.querySelectorAll(".timeline__content"),
	    arrows = document.querySelectorAll(".timeline__arrow"),
	    arrowPrev = document.querySelector(".timeline__arrow_prev"),
	    arrowNext = document.querySelector(".timeline__arrow_next"),
	    firstItem = document.querySelector(".timeline__item:first-child"),
	    lastItem = document.querySelector(".timeline__item:last-child"),
	    xScrolling = 280,
	    disabledClass = "timeline__arrow_disabled";

	  // START
	  window.addEventListener("load", init);

	  function init() {
	    setEqualHeights(elH);
	    animateTl(xScrolling, arrows, timeline);
	    setSwipeFn(timeline, arrowPrev, arrowNext);
	    setKeyboardFn(arrowPrev, arrowNext);
	  }

	  // SET EQUAL HEIGHTS
	  function setEqualHeights(el) {
	    let counter = 0;
	    for (let i = 0; i < el.length; i++) {
	      const singleHeight = el[i].offsetHeight;

	      if (counter < singleHeight) {
	        counter = singleHeight;
	      }
	    }

	    for (let i = 0; i < el.length; i++) {
	      el[i].style.height = `${counter}px`;
	    }
	  }

	  // CHECK IF AN ELEMENT IS IN VIEWPORT
	  function isElementInViewport(el) {
	    const rect = el.getBoundingClientRect();
	    return (
	      rect.top >= 0 &&
	      rect.left >= 0 &&
	      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	    );
	  }

	  // SET STATE OF PREV/NEXT ARROWS
	  function setBtnState(el, flag = true) {
	    if (flag) {
	      el.classList.add(disabledClass);
	    } else {
	      if (el.classList.contains(disabledClass)) {
	        el.classList.remove(disabledClass);
	      }
	      el.disabled = false;
	    }
	  }

	  // ANIMATE TIMELINE
	  function animateTl(scrolling, el, tl) {
	    let counter = 0;
	    for (let i = 0; i < el.length; i++) {
	      el[i].addEventListener("click", function() {
	        if (!arrowPrev.disabled) {
	          arrowPrev.disabled = true;
	        }
	        if (!arrowNext.disabled) {
	          arrowNext.disabled = true;
	        }
	        const sign = (this.classList.contains("timeline__arrow_prev")) ? "" : "-";
	        if (counter === 0) {
	          tl.style.transform = `translateX(-${scrolling}px)`;
	        } else {
	          const tlStyle = getComputedStyle(tl);
	          // add more browser prefixes if needed here
	          const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
	          const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
	          tl.style.transform = `translateX(${values}px)`;
	        }

	        setTimeout(() => {
	          isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
	          isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
	        }, 1100);

	        counter++;
	      });
	    }
	  }

	  // ADD SWIPE SUPPORT FOR TOUCH DEVICES
	  function setSwipeFn(tl, prev, next) {
	    const hammer = new Hammer(tl);
	    hammer.on("swipeleft", () => next.click());
	    hammer.on("swiperight", () => prev.click());
	  }

	  // ADD BASIC KEYBOARD FUNCTIONALITY
	  function setKeyboardFn(prev, next) {
	    document.addEventListener("keydown", (e) => {
	      if ((e.which === 37) || (e.which === 39)) {
	        const timelineOfTop = timeline.offsetTop;
	        const y = window.pageYOffset;
	        if (timelineOfTop !== y) {
	          window.scrollTo(0, timelineOfTop);
	        }
	        if (e.which === 37) {
	          prev.click();
	        } else if (e.which === 39) {
	          next.click();
	        }
	      }
	    });
	  }

	})();

// $(window).on('load', function() {

// });