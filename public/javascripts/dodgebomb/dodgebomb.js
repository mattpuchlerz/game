var Dodgebomb = new Class({	

  Implements: [Options],
  
  assets: [
    'javascripts/player.js', 
    'javascripts/viewport.js',
    'stylesheets/dodgebomb.css'
  ],
  
  options: {
    path: '/dodgebomb/'
  },

  initialize: function(options) {
    this.setOptions(options);
    this.loadAssets();
  },

  loadAssets: function() {
		var loadedAssets = 0;
		var assetType;
	  
		this.assets.each(function(asset) {
		  
		  if (asset.contains('.js'))
		    assetType = 'javascript';
	    else if (asset.contains('.css'))
	      assetType = 'css';
	    else
	      assetType = 'image';
		  
			new Asset[assetType](this.options.path + asset, {
				onload: function() {
					loadedAssets++;
					if (loadedAssets == assets.length) this.setup();
				}.bind(this)
			});
			
		}, this);
	},
	
	setup: function() {
	  this.setupViewport();
    this.setupPlayer();
	},
	
	setupPlayer: function() {
    this.player = new Dodgebomb.Player();
  },

  setupViewport: function() {
    this.viewport = new Dodgebomb.Viewport();
  }

});