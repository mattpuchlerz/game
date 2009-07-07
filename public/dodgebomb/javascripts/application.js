Assets.implement({ assetsPath: '/dodgebomb/' });

if (!$defined(Dodgebomb)) var Dodgebomb = {};

Dodgebomb.Application = new Class({	

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
  
  movePlayerViaMouse: function(event) {
    var percentage = Dodgebomb.Singleton.viewport.getMousePosition(event).xPercentage;
    Dodgebomb.Singleton.player.moveTo(percentage);
  },
	
	setupPlayer: function() {
    Dodgebomb.Singleton.player = new Dodgebomb.Player();
    window.addEvent('mousemove', this.movePlayerViaMouse.bindWithEvent(this));
  },

  setupViewport: function() {
    Dodgebomb.Singleton.viewport = new Dodgebomb.Viewport();
  }

});