var Dodgebomb = new Class({	
	
	// Implements: [Options],
	
	initialize: function(options) {
		// this.setOptions(options);
		this.setupViewport();
		this.setupPlayer();
	},
	
	setupPlayer: function() {
		this.player = new Dodgebomb.Player();
	},
	
	setupViewport: function() {
		this.viewport = new Element('div', { id: 'viewport' });
		this.viewport.inject(document.body);
	}
	
});