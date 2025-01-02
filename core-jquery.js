/** External file built by PHP */
let h1 = [
	{"ID": 1, "Value": "Stay a Step Ahead of Industry Issues"},
	{"ID": 2, "Value": "Don't Deal With Issues Alone. We Can Help!"},
	{"ID": 3, "Value": "Fight Important Issue With Global Coast Support"},
];

let cta = [
	{"ID": 4, "Value": "Learn More"},
	{"ID": 5, "Value": "Learn How"},
	{"ID": 6, "Value": "Discover More"},
	{"ID": 7, "Value": "Discover How"},
	{"ID": 8, "Value": "See How We Can Help"},
	{"ID": 9, "Value": "Learn How We Can Help"},
];
/** End External File **/

var contentIsSet = false;

jQuery(function() {
	let clientURL = window.location.host;

	function updateContentBasedOnSmarterMetrics() {
		jQuery.post('https://{{ your-domain-here.com }}/smartLP/handler.php', {
			action: 'updateContentBasedOnSmarterMetrics',
			clientURL: clientURL
		}, function(response) {
			let json = JSON.parse(response);

			for(var i = 0; i < h1.length; i++) {
				if(h1[i].ID == json.h1id) {
					jQuery('.smart-lp-h1').html(h1[i].Value).data('index', json.h1id);
				}
			}

			for(var i = 0; i < cta.length; i++) {
				if(cta[i].ID == json.ctaid) {
					jQuery('.smart-lp-cta').html(cta[i].Value).data('index', json.ctaid);
				}
			}

			contentIsSet = true;
		})
		.fail(function() {
			contentIsSet = false;
			defaultContentSet();
		});
	}

	var randomPropertyKey = function (object) {
		var keys = Object.keys(object);
		return keys[Math.floor(keys.length * Math.random())];
	};

	/** For statically loading content */
	let randomH1Index = randomPropertyKey(h1);
	let randomCTAIndex = randomPropertyKey(cta);

	function defaultContentSet() {
		contentIsSet = true;
		console.log('Ajax called failed. Setting content by default.');
		jQuery('.smart-lp-h1').html(h1[randomH1Index].Value).data("index", h1[randomH1Index].ID);	// does NOT write data-* attributes
		jQuery('.smart-lp-cta').html(cta[randomCTAIndex].Value).data("index", cta[randomCTAIndex].ID);
	}

	// default content if AJAX lags
	setTimeout(function() {
		if( !contentIsSet ) {
			defaultContentSet();
		}
	}, 2000);

	/** Dynamic Loading Content */
	updateContentBasedOnSmarterMetrics();

	jQuery('.smart-lp-cta').click(function(e) {
		// e.preventDefault();	// todo: probably don't want to do this
		let url = jQuery(this).attr('href');	// todo: save href and clear to give script time to run
		let winningH1Index = jQuery('.smart-lp-h1').data("index");
		let winningCtaIndex = jQuery('.smart-lp-cta').data("index");

		/** testing */
		console.log('winning h1: ' + winningH1Index);
		console.log('winning cta: ' + winningCtaIndex);
		console.log('redirect: ' + url);

		let indexes = {
			h1: winningH1Index,
			cta: winningCtaIndex
		};

		logResultsWithRedirectURL(indexes, url);
	});

	function logResultsWithRedirectURL(indexes, url) {
		jQuery.post('https://{{ your-domain-here.com }}/smartLP/handler.php', {
			action: 'smart-lp-log-results',
			indexes: indexes
		}, function(response) {
			console.log('logging cta complete: sending user to url: ' + url);
		});
	}
});
