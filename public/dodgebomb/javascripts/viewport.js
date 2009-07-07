if (!$defined(Dodgebomb)) var Dodgebomb = {};

Dodgebomb.Viewport = new Class({

  initialize: function() {
    this.setupDom();
  },
  
  getMousePosition: function(event) {
		var elementPosition = this.element.getPosition();
		
		var mousePosition = {
			x: event.page.x - elementPosition.x,
			y: event.page.y - elementPosition.y
		};		
		
		return $extend(mousePosition, {
			xPercentage: mousePosition.x / this.element.getStyle('width').toInt() * 100,
			yPercentage: mousePosition.y / this.element.getStyle('height').toInt() * 100
		});
	},

  setupDom: function() {
    this.element = new Element('div', { id: 'viewport' });
    this.element.inject(Dodgebomb.Singleton.element);
  }

});