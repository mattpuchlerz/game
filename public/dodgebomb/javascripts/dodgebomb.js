Asset.extend({

  css: function(source, properties) {
    var load = properties.onload || $empty;
  	delete properties.onload;
    
  	var tag = new Element('link', $merge({
  		'rel': 'stylesheet', 'media': 'screen', 'type': 'text/css', 'href': source
  	}, properties)).inject(document.head);
  	
  	load.bind(tag)();
		
		return tag;
  }
  
});



var Dodgebomb = new Class({	

  Implements: [Options],
  
  assets: [
    'javascripts/singleton.js', 
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

      Dodgebomb.log('Asset ... ' + asset);
      new Asset[assetType](this.options.path + asset, {
        onload: function() {
          Dodgebomb.log('Asset +++ ' + asset);
          loadedAssets++;
          if (loadedAssets == this.assets.length) this.setup();
        }.bind(this)
      });

    }, this);
  },
	
	setup: function() {
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



Dodgebomb.log = function(obj) {
	if (console && console.log) console.log(obj);
}