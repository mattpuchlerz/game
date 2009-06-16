Assets.implement({ assetsPath: '/dodgebomb/' });

var Dodgebomb = new Class({	

  Implements: Assets,
  
  assets: [
    'javascripts/singleton.js', 
    'javascripts/player.js', 
    'javascripts/viewport.js',
    'stylesheets/dodgebomb.css'
  ],
  
  initialize: function(options) {
    this.loadAssets();
  },
	
	assetsLoaded: function() {
	  Dodgebomb.Singleton.element = new Element('div', { id: 'dodgebomb' }).inject(document.body);
	  
	  this.setupViewport();
    this.setupPlayer();
	},
	
	setupPlayer: function() {
    Dodgebomb.Singleton.player = new Dodgebomb.Player();
  },

  setupViewport: function() {
    Dodgebomb.Singleton.viewport = new Dodgebomb.Viewport();
  }

});