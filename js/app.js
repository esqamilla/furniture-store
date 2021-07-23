// =================
// Registration form
// =================
const form = document.getElementById('reg');
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	checkInputs();
	const regControls = document.querySelectorAll('.reg__control.success');

	if (regControls.length == 5) {
		const regChecks = document.querySelectorAll('.reg__check');
		const regComplete = document.getElementById('reg__complete');

		form.className = 'reg hidden';
		for (regCheck of regChecks) {
			regCheck.className = 'reg__check hidden';
			regComplete.className = 'reg__complete block';
		}
	}

	if (regCompleteClass.classList.contains('block')) {
		feedbackUsername.value = username.value.trim();
		feedbackEmail.value = email.value.trim();
	}
});

const checkInputs = () => {
	const usernameValue = username.value.trim();
	const phoneValue = phone.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();

	if (usernameValue === '') {
		setErrorFor(username);
	} else {
		setSuccessFor(username);
	}

	if (phoneValue === '') {
		setErrorFor(phone);
	} else if (!isPhone(phoneValue)) {
		setErrorFor(phone);
	} else {
		setSuccessFor(phone);
	}

	if (emailValue === '') {
		setErrorFor(email);
	} else if (!isEmail(emailValue)) {
		setErrorFor(email);
	} else {
		setSuccessFor(email);
	}

	if (passwordValue === '') {
		setErrorFor(password);
	} else {
		setSuccessFor(password);
	}

	if (password2Value === '') {
		setErrorFor(password2);
	} else if (passwordValue !== password2Value) {
		setErrorFor(password2);
	} else {
		setSuccessFor(password2);
	}
};

const setErrorFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'reg__control error';
};

const setSuccessFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'reg__control success';
};

const isEmail = email => {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

const isPhone = phone => {
	return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phone);
};



// ===========================
// =======Feedback form=======
// ===========================
const feedbackForm = document.getElementById('connectionForm');
const feedbackUsername = document.getElementById('usernameCon');
const feedbackEmail = document.getElementById('emailCon');
const regCompleteClass = document.querySelector('.reg__complete');

feedbackForm.addEventListener('submit', (e) => {
	e.preventDefault();

	feedbackCheckInputs();
});

const feedbackCheckInputs = () => {
	const feedbackUsernameValue = feedbackUsername.value.trim();
	const feedbackEmailValue = feedbackEmail.value.trim();

	if (feedbackUsernameValue === '') {
		feedbackSetErrorFor(feedbackUsername);
	} else {
		feedbackSetSuccessFor(feedbackUsername);
	}

	if (feedbackEmailValue === '') {
		feedbackSetErrorFor(feedbackEmail);
	} else if (!feedbackIsEmail(feedbackEmailValue)) {
		feedbackSetErrorFor(feedbackEmail);
	} else {
		feedbackSetSuccessFor(feedbackEmail);
	}
};

const feedbackSetErrorFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'connection__control error';
};

const feedbackSetSuccessFor = (input) => {
	const formControl = input.parentElement;

	formControl.className = 'connection__control success';
};

const feedbackIsEmail = email => {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};



$(function () {
	// ========================
	// ======== Filter ========
	// ========================
	const filter = $("[data-filter]");
	const catalog = $(".catalog__link");

	filter.on("click", function (e) {
		e.preventDefault();

		let cat = $(this).data(`filter`);

		$("[data-cat]").each(function () {
			let productCat = $(this).data(`cat`);

			if (productCat != cat) {
				$(this).addClass('hide');
			} else {
				$(this).removeClass('hide');
			}
		});
	});

	catalog.on("click", function (e) {
		e.preventDefault();
		catalog.removeClass('active');
		$(this).addClass('active');
	});



	// ========================
	// ========= Modal ========
	// ========================
	const modalCall = $("[data-modal]");
	const modalCompleteCall = $("[data-complete]");
	const modalCancelCall = $("[data-cancel]");
	const modalClose = $("[data-close]");
	const modalCloseComplete = $("[data-closeCC]");
	const modalCloseCancel = $("[data-closeCCC]");

	modalCompleteCall.on("click", function (e) {
		e.preventDefault();

		if ($('.reg__complete').hasClass('block')) {
			let $this = $(this);
			let CompleteId = $this.data(`complete`);

			$(CompleteId).addClass('flex');
		}
	});

	modalCancelCall.on("click", function (e) {
		e.preventDefault();

		if (!$('.reg__complete').hasClass('block')) {
			let $this = $(this);
			let cancelId = $this.data(`cancel`);

			$(cancelId).addClass('flex');
		}
	});

	modalCloseComplete.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let completeParent = $this.parents('.modal__complete');

		completeParent.removeClass('flex');
	});

	modalCloseCancel.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let cancelParent = $this.parents('.modal__cancel');

		cancelParent.removeClass('flex');
	});

	// let i = 1;

	modalCall.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let modalId = $(this).data(`modal`);

		$(modalId).addClass('show');
		$("body").addClass('no-scroll');

		setTimeout(function () {
			$(modalId).find(".modal__dialog").css({
				transform: "rotateX(0)"
			});
		}, 200);

		$("[data-slider='modalSlider']").slick('setPosition');

		// ==============================================
		// ======== input + | - /  Dinamic price ========
		// ==============================================
		let priceUp = $("[data-up]");
		let priceDown = $("[data-down]");
		let i = 1;
		priceId = $this.attr("data-priceValue");
		price = $(priceId).val();
		paymentPrice = price;
		startingPrice = price;

		priceUp.on("click", function (e) {
			e.preventDefault();

			i++;
			$("[data-input]").val(i);
			$(priceId).val(Number(paymentPrice) * $('[data-input]').val());
		});

		priceDown.on("click", function (e) {
			e.preventDefault();

			i--;

			if ($("[data-input]").val() != 1) {
				$("[data-input]").val(i);
				$(priceId).val(Number(paymentPrice) * $('[data-input]').val());
			} else {
				$('[data-input]').val('1');
				$(priceId).val(Number(paymentPrice) * $('[data-input]').val());
			}
		});
	});

	modalClose.on("click", function (e) {
		e.preventDefault();

		let $this = $(this);
		let modalParent = $this.parents('.modal');

		modalParent.find(".modal__dialog").css({
			transform: "rotateX(90deg)"
		});

		setTimeout(function () {
			modalParent.removeClass('show');
			$("body").removeClass('no-scroll');

			$('[data-input]').val(1);
			$(priceId).val(startingPrice);
		}, 200);
	});

	$(".modal").on("click", function (e) {
		let $this = $(this);

		$this.find(".modal__dialog").css({
			transform: "rotateX(90deg)"
		});

		setTimeout(function () {
			$this.removeClass('show');
			$("body").removeClass('no-scroll');

			$('[data-input]').val('1');
			$(priceId).val(startingPrice);
		}, 200);
	});

	$(".modal__dialog").on("click", function (e) {
		e.stopPropagation();
	});



	// ========================================================================
	// ======== Slider for modal: https://kenwheeler.github.io/slick/ =========
	// ========================================================================
	$("[data-slider='modalSlider']").slick({
		infinite: true,
		slidesToShow: 1,
		fade: true,
		dots: true,
		arrows: false,
	});

	$('.slickPrev').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.modal').find("[data-slider='modalSlider']");

		currentSlider.slick("slickPrev");
	});

	$('.slickNext').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.modal').find("[data-slider='modalSlider']");

		currentSlider.slick("slickNext");
	});



	//===========================================================================
	// ======== Slider for riviews: https://kenwheeler.github.io/slick/ =========
	// ==========================================================================
	$("[data-slider='reviewsSlider']").slick({
		infinite: true,
		slidesToShow: 1,
		dots: true,
		arrows: false
	});

	$('.slickPrev').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.reviews').find("[data-slider='reviewsSlider']");

		currentSlider.slick("slickPrev");
	});

	$('.slickNext').on("click", function (e) {
		e.preventDefault();

		let currentSlider = $(this).parents('.reviews').find("[data-slider='reviewsSlider']");

		currentSlider.slick("slickNext");
	});



	// ===============================
	// ======== Fixed header =========
	// ===============================
	const header = $("#header");
	let introH = $("#intro").innerHeight() - 320;
	let catalogH = $("#catalog").innerHeight() + introH;
	let reviewsH = $("#reviews").innerHeight() + catalogH + 80;
	let connectionH = $("#connection").innerHeight() + reviewsH + 80;
	let aboutH = $("#connection").innerHeight() + connectionH + 80;
	let scrollOffset = $(window).scrollTop();

	cheskScroll(scrollOffset);

	$(window).on("scroll", function () {
		scrollOffset = $(this).scrollTop();

		introH = $("#intro").innerHeight() - 320;
		catalogH = $("#catalog").innerHeight() + introH;
		reviewsH = $("#reviews").innerHeight() + catalogH + 80;
		connectionH = $("#connection").innerHeight() + reviewsH + 80;
		aboutH = $("#connection").innerHeight() + connectionH + 80;

		cheskScroll(scrollOffset);
	});

	function cheskScroll(scrollOffset) {
		if (scrollOffset >= introH) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}

		// Подсвечивание ссылки до каталога
		if (scrollOffset <= introH) {
			$('#toIntro').addClass('select');
		} else {
			$('#toIntro').removeClass('select');
		}

		// Подсвечивание ссылки до отзывов
		if (scrollOffset > introH && scrollOffset <= catalogH) {
			$('#toCatalog').addClass('select');
		} else {
			$('#toCatalog').removeClass('select');
		}

		// Подсвечивание ссылки до формы обратной связи
		if (scrollOffset > catalogH && scrollOffset <= reviewsH) {
			$('#toReviews').addClass('select');
		} else {
			$('#toReviews').removeClass('select');
		}

		// Подсвечивание ссылки до компании
		if (scrollOffset > reviewsH && scrollOffset <= connectionH) {
			$('#toConnection').addClass('select');
		} else {
			$('#toConnection').removeClass('select');
		}

		// Подсвечивание ссылки до футера
		if (scrollOffset > connectionH && scrollOffset <= aboutH) {
			$('#toAbout').addClass('select');
		} else {
			$('#toAbout').removeClass('select');
		}
	}



	// ================================
	// ======== Smooth scroll =========
	// ================================
	$("[data-scroll]").on("click", function (e) {
		e.preventDefault();

		let blockId = $(this).data(`scroll`);
		let blockOffset = $(blockId).offset().top;

		$("html, body").animate({
			scrollTop: blockOffset - 69,
		}, 500);
	});

});