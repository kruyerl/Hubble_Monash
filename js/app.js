var Images = []

var Channel = {
	InterfaceID: '#interface',
	Interface: 0,
	InitialSlide: 1,
	InterfaceIndex: 0,

	Initialize: function() {
		this.Interface = new Swiper(Channel.InterfaceID, {
			speed: 200,
			noSwiping: false,
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
	form: $('#name, #number, #email, #dealers'),

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

		$(APP.video).on('ended', function() {
			APP.endedVideo()
		})

		this.exitOpenDay.on('click', function() {
			APP.navigationSelected(5)
		})

		this.exitCourses.on('click', function() {
			APP.navigationSelected(5)
		})

		this.exitGallery.on('click', function() {
			APP.navigationSelected(5)
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

	onload: function() {
		APP.PreloadImages()
	},

	navigationSelected: function(nav) {
		if (nav == 1) {
			Channel.Interface.slideTo(2)
		} else if (nav == 2) {
			Channel.Interface.slideTo(0)
		} else if (nav == 3) {
			APP.playVideo()
		} else if (nav == 4) {
			Channel.Interface.slideTo(3)
		} else if (nav == 5) {
			Channel.Interface.slideTo(1)
		}
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

	PreloadImages: function() {
		var url = 'img/2-features/wheels/'
		var ext = '.jpg'
		var img = new Image()

		for (var i = 1; i <= 7; i++) {
			img.src = url + i + ext
			Images.push(img.src)
		}
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
