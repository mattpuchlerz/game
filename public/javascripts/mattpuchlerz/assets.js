Asset.css = function(source, properties) {
  var load = properties.onload || $empty;
	delete properties.onload;
  
	var tag = new Element('link', $merge({
		'rel': 'stylesheet', 'media': 'screen', 'type': 'text/css', 'href': source
	}, properties)).inject(document.head);
	
	load.bind(tag)();
	
	return tag;
}



var Assets = new Class({
  
  Implements: Events,
  
  assetsPath: '/',
  
  loadAssets: function() {
		var loadedAssets = 0;
		var assetType;
		
		if (this.assetsLoaded) this.addEvent('assetsLoaded', this.assetsLoaded);
	  
    this.assets.each(function(asset) {

      if (asset.contains('.js'))
        assetType = 'javascript';
      else if (asset.contains('.css'))
        assetType = 'css';
      else
        assetType = 'image';

      new Asset[assetType](this.assetsPath + asset, {
        onload: function() {
          loadedAssets++;
          if (loadedAssets == this.assets.length) this.fireEvent('assetsLoaded');
        }.bind(this)
      });

    }, this);
  }
  
});