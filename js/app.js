var Channel = {
	// Interface Gallery
	InterfaceID: '#interface',
	Interface: 0,
	InitialSlide: 1,
	InterfaceIndex: 0,
	// Gallery Page Gallery
	galleryID: '#gallery-section',
	gallery: 0,
	galleryIndex: 0,
	galleryInactive: true,
	// courses Page courses
	CourseOuterSlideID: '#CourseOuterSlide',
	CourseOuterSlide: 0,
	CourseOuterSlideIndex: 0,
	CourseOuterSlideInactive: true,
	// courses Inner
	CourseInnerSlideID: '#CourseInnerSlide',
	CourseInnerSlide: 0,
	CourseInnerSlideIndex: 0,
	CourseInnerSlideInactive: true,

	Initialize: function() {
		this.Interface = new Swiper(Channel.InterfaceID, {
			speed: 400,
			noSwiping: true,
			initialSlide: this.InitialSlide,
			noSwipingClass: 'disable-swipe',
		})
		this.gallery = new Swiper(Channel.galleryID, {
			speed: 400,
			noSwiping: false,
			noSwipingClass: 'disable-swipe',
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.next-gal',
				prevEl: '.prev-gal',
			},
		})
		this.CourseOuterSlide = new Swiper(Channel.CourseOuterSlideID, {
			speed: 400,
			noSwiping: true,
			noSwipingClass: 'disable-swipe',
			loop: true,
			direction: 'vertical',
		})
		this.CourseInnerSlide = new Swiper(Channel.CourseInnerSlideID, {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
		})
	},
}

var APP = {
	CourseImagesArr: [
		'./img/3 Courses/Information Pages/1.1.jpg',
		'./img/3 Courses/Information Pages/2.1.jpg',
		'./img/3 Courses/Information Pages/3.1.jpg',
		'./img/3 Courses/Information Pages/4.1.jpg',
		'./img/3 Courses/Information Pages/4.2.jpg',
		'./img/3 Courses/Information Pages/4.3.jpg',
		'./img/3 Courses/Information Pages/4.4.jpg',
		'./img/3 Courses/Information Pages/4.5.jpg',
		'./img/3 Courses/Information Pages/4.6.jpg',
		'./img/3 Courses/Information Pages/5.1.jpg',
		'./img/3 Courses/Information Pages/5.2.jpg',
	],
	navs: $('.navs'),
	video: document.getElementById('video'),
	videoSection: $('#video-section'),
	closeVid: $('#closeVid'),
	form: $('#name, #number, #email, #dealers'),
	formSection: $('#form-section'),
	exitForm: $('#exitForm'),
	submit: $('#submit'),
	exitOpenDay: $('#exitOpenDay'),
	exitCourses: $('#exitCourses'),
	exitGallery: $('#exitGallery'),
	gallerySection: $('#gallery-section'),
	openDayBtn: $('#openDayBtn'),
	openDaySection: $('#openDay-section'),
	courseNavs: $('.courseNav'),
	courses: $('.courseCard'),
	courseInfoSection: $('#courseInfo-section'),
	exitCourseInfo: $('#exitCourseInfo'),
	courseInfoImg: $('#courseInfoImg'),
	moreInfoBtn: $('#moreInfoBtn'),

	Initialize: function() {
		APP.onload()
		// Reporting 10 Seconds Interval
		setInterval(function() {
			hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
				intervals: '10 Second Interval',
			})
		}, 10000)
		//Main Interface Nav
		this.navs.on('click', function() {
			var nav = $(this).data('navs')
			APP.navSelected(nav)
		})
		//Course Navigation
		this.courseNavs.on('click', function() {
			var x = $(this).data('coursenavkey')
			APP.courseNavigationSelected(x)
			APP.handleCourseInfoActive(this)
		})
		//Course Selection Process
		this.courses.on('click', function() {
			var x = $(this).attr('data-coursekey')
			APP.updateCourseInfo(x)
			APP.courseInfoSection.velocity(
				{ opacity: 1 },
				{ delay: 400, duration: 700, display: 'block' }
			)
		})
		this.exitCourseInfo.on('click', function() {
			APP.courseInfoSection.velocity(
				{ opacity: 0 },
				{ delay: 400, duration: 700, display: 'none' }
			)
		})

		this.moreInfoBtn.on('click', function() {
			APP.formSection.velocity(
				{ opacity: 1 },
				{ delay: 400, duration: 700, display: 'block' }
			)
		})

		$(APP.video).on('ended', function() {
			APP.endedVideo()
		})
		this.openDayBtn.on('click', function() {
			APP.OpenOpenDay()
		})
		this.exitOpenDay.on('click', function() {
			APP.CloseOpenDay()
		})
		this.exitGallery.on('click', function() {
			APP.navSelected(5)
			Channel.gallery.slideTo(1)
		})
		this.exitCourses.on('click', function() {
			APP.navSelected(5)
		})
		this.closeVid.on('click', function() {
			APP.skippedVideo()
		})
		this.exitForm.on('click', function() {
			APP.formSection.velocity(
				{ opacity: 0 },
				{ delay: 400, duration: 700, display: 'none' }
			)
		})
		$('#submit').on('click', function() {
			APP.ValidateInput()
		})
	},

	onload: function() {},

	navSelected: function(nav) {
		if (nav == 1) {
		} else if (nav == 2) {
			Channel.Interface.slideTo(0)
		} else if (nav == 3) {
			APP.playVideo()
		} else if (nav == 4) {
			Channel.Interface.slideTo(2)
		} else if (nav == 5) {
			Channel.Interface.slideTo(1)
		}
	},
	courseNavigationSelected: function(coursenavkey) {
		if (coursenavkey == 1) {
			Channel.CourseOuterSlide.slideTo(1)
		} else if (coursenavkey == 2) {
			Channel.CourseOuterSlide.slideTo(2)
		} else if (coursenavkey == 3) {
			Channel.CourseOuterSlide.slideTo(3)
		} else if (coursenavkey == 4) {
			Channel.CourseOuterSlide.slideTo(4)
		} else if (coursenavkey == 5) {
			Channel.CourseOuterSlide.slideTo(5)
		}
	},
	handleCourseInfoActive: function(section) {
		var sections = document.querySelectorAll('.courseNavImg')
		for (i = 0; i < sections.length; i++) {
			sections[i].classList.remove('active')
		}
		section.classList.add('active')
	},
	updateCourseInfo: function(indexKey) {
		$('#courseInfoImg').attr('src', '' + APP.CourseImagesArr[indexKey - 1] + '')
	},

	OpenOpenDay: function() {
		APP.openDaySection.velocity(
			{ opacity: 1 },
			{ delay: 400, duration: 700, display: 'block' }
		)
	},
	CloseOpenDay: function() {
		APP.openDaySection.velocity(
			{ opacity: 0 },
			{ delay: 400, duration: 700, display: 'none' }
		)
	},
	playVideo: function() {
		APP.video.play()
		APP.videoSection.velocity(
			{ opacity: 1 },
			{ delay: 400, duration: 700, display: 'block' }
		)
	},
	endedVideo: function() {
		APP.videoSection.velocity(
			{ opacity: 0 },
			{ delay: 100, duration: 700, display: 'none' }
		)
		setTimeout(function() {
			APP.video.load()
		}, 1200)
	},
	skippedVideo: function() {
		APP.videoSection.velocity(
			{ opacity: 0 },
			{ delay: 100, duration: 700, display: 'none' }
		)
		setTimeout(function() {
			APP.video.load()
		}, 1200)
	},

	ValidateInput: function() {
		var Name = document.getElementById('name')
		var Number_ = document.getElementById('number')
		var Dealer = document.getElementById('dealers')
		var Email = document.getElementById('email')
		var Language = badwords.indexOf(Name.value)
		var BorderRed = '6px solid red',
			BorderDefault = '6px solid transparent'
		var ValuesEmpty =
			Name.value === '' || Number_.value === '' || Email.value === ''
		var ValuesNotEmpty =
			Name.value !== '' || Number_.value !== '' || Email.value !== ''

		if (ValuesEmpty) {
			if (Email.value === '') APP.InputAction(Email)
			else if (Email.value !== '') {
				if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value))
					APP.InputAction(Email)
			}
			return false
		} else if (ValuesNotEmpty) {
			if (Email.value !== '') {
				if (
					!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value)
				) {
					APP.InputAction(Email)
					return false
				}
			}
		} else {
			clickHandler(event)
			return true
		}
	},

	InputAction: function(id) {
		var BorderRed = '6px solid red',
			BorderDefault = '6px solid transparent'
		$(id).css({ border: BorderRed })
		setTimeout(function() {
			$(id).css({ border: BorderDefault })
		}, 2000)
	},
}

Channel.Initialize()
APP.Initialize()
