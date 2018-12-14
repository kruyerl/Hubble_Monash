const CourseImagesArr = [
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
]

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
			on: {
				transitionStart: function() {
					Channel.InterfaceIndex = Channel.Interface.activeIndex

					if (Channel.InterfaceIndex == 0) {
						hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
							type: 'slide',
							content_id: '0',
							event: 'viewed',
						})
					} else if (Channel.InterfaceIndex == 1) {
						hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
							type: 'slide',
							content_id: '1',
							event: 'viewed',
						})
					} //todo: populate if events
				},
			},
		})

		this.gallery = new Swiper(Channel.galleryID, {
			speed: 200,
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
			on: {
				transitionStart: function() {
					Channel.galleryIndex = Channel.gallery.activeIndex
					var activeSlide = Channel.galleryIndex

					if (Channel.galleryIndex == 0) {
						hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
							type: 'slide',
							content_id: 'VLVSAB181127',
							event: 'viewed',
						})
					} else if (Channel.galleryIndex == 1) {
						hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
							type: 'slide',
							content_id: 'VLVSAC181127',
							event: 'viewed',
						})
					}
				},
			},
		})

		this.CourseOuterSlide = new Swiper(Channel.CourseOuterSlideID, {
			speed: 200,
			noSwiping: false,
			noSwipingClass: 'disable-swipe',
			loop: true,
			direction: 'vertical',
		})
		var CourseInnerSlide = new Swiper(Channel.CourseInnerSlideID, {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
		})
	},
}

var APP = {
	autoSlideInterval: null,
	navs: $('.navs'),
	video: document.getElementById('video'),
	videoSection: $('#video-section'),
	submit: $('#submit'),
	closeVid: $('#closeVid'),
	exitOpenDay: $('#exitOpenDay'),
	exitCourses: $('#exitCourses'),
	exitGallery: $('#exitGallery'),
	gallerySection: $('#gallery-section'),
	openDayBtn: $('#openDayBtn'),
	openDaySection: $('#openDay-section'),
	form: $('#name, #number, #email, #dealers'),
	courseNavs: $('.courseNav'),
	courses: $('.coursesCard'),
	courseInfoSection: $('#courseInfo-section'),
	courseInfoImg: $('#courseInfoImg'),
	exitCourseInfo: $('#exitCourseInfo'),

	Initialize: function() {
		APP.onload()

		// Reporting 10 Seconds Interval
		setInterval(function() {
			hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
				intervals: '10 Second Interval',
			})
		}, 10000)

		APP.navs.on('click', function() {
			var nav = $(this).data('navs')
			APP.navigationSelected(nav)
		})

		APP.courseNavs.on('click', function() {
			var x = $(this).data('coursenavkey')
			APP.courseNavigationSelected(x)
			APP.toggleActive(this)
		})
		/*
		APP.courses.on('click', function() {
			var x = $(this).data('coursekey')
			let resultImg = CourseImagesArr[x - 1]
			APP.toggleCourseInfoSectionOpen(resultImg)
		})*/

		$(APP.video).on('ended', function() {
			APP.endedVideo()
		})

		this.openDayBtn.on('click', function() {
			APP.toggleOpenDayOpen()
		})

		this.exitOpenDay.on('click', function() {
			APP.toggleOpenDayClosed()
		})

		this.exitCourses.on('click', function() {
			APP.navigationSelected(5)
		})
		/*
		this.exitCourseInfo.on('click', function() {
			APP.toggleCourseInfoSectionClosed()
		})*/

		this.exitGallery.on('click', function() {
			APP.navigationSelected(5)
			Channel.gallery.slideTo(1)
		})

		this.closeVid.on('click', function() {
			APP.skippedVideo()
		})

		this.submit.on('click', function() {
			APP.ValidateInput()
		})

		// Form Slide Up
		this.form.on('focus', function() {
			$('#form')
				.stop(false, false)
				.animate({ top: '-180px' }, 250)
		})

		this.form.on('focusout', function() {
			$('#form')
				.stop(true, true)
				.animate({ top: '0px' }, 250)
		})
	},

	onload: function() {},

	navigationSelected: function(nav) {
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

	toggleActive: function(section) {
		var sections = document.querySelectorAll('.courseNavImg')
		for (i = 0; i < sections.length; i++) {
			sections[i].classList.remove('active')
		}
		section.classList.add('active')
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

	/*toggleCourseInfoSectionOpen: function(srcUrl) {
		let image = APP.courseInfoImg
		image.src = srcUrl
		APP.courseInfoSection.velocity(
			{ opacity: 1 },
			{ delay: 400, duration: 700, display: 'block' }
		)
	},
	toggleCourseInfoSectionClosed: function() {
		APP.courseInfoSection.velocity(
			{ opacity: 0 },
			{ delay: 400, duration: 700, display: 'none' }
		)
		hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
			type: 'video',
			content_id: 'VLVVAA181127',
			event: 'started',
		})
	},*/
	toggleOpenDayOpen: function() {
		APP.openDaySection.velocity(
			{ opacity: 1 },
			{ delay: 400, duration: 700, display: 'block' }
		)
		hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
			type: 'video',
			content_id: 'VLVVAA181127',
			event: 'started',
		})
	},
	toggleOpenDayClosed: function() {
		APP.openDaySection.velocity(
			{ opacity: 0 },
			{ delay: 400, duration: 700, display: 'none' }
		)
		hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
			type: 'video',
			content_id: 'VLVVAA181127',
			event: 'started',
		})
	},
	playVideo: function() {
		APP.video.play()
		APP.videoSection.velocity(
			{ opacity: 1 },
			{ delay: 400, duration: 700, display: 'block' }
		)
		hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
			type: 'video',
			content_id: 'Played Monash Video',
			event: 'started',
		})
	},

	endedVideo: function() {
		APP.videoSection.velocity(
			{ opacity: 0 },
			{ delay: 100, duration: 700, display: 'none' }
		)
		setTimeout(function() {
			APP.video.load()
		}, 1200)
		hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
			type: 'video',
			content_id: 'Watched Full Monash Video',
			event: 'ended',
		})
	},

	skippedVideo: function() {
		APP.videoSection.velocity(
			{ opacity: 0 },
			{ delay: 100, duration: 700, display: 'none' }
		)
		setTimeout(function() {
			APP.video.load()
		}, 1200)
		hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {
			type: 'video',
			content_id: 'Skipped Monash Video',
			event: 'skipped',
		})
	},

	ValidateInput: function() {
		var Email = document.getElementById('email')
		var Language = badwords.indexOf(Name.value)
		var BorderRed = '6px solid red',
			BorderDefault = '6px solid transparent'
		var ValuesEmpty = Email.value === ''
		var ValuesNotEmpty = Email.value !== ''

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
				} else {
					clickHandler(event)
					return true
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
