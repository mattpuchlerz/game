if (!$defined(Dodgebomb)) var Dodgebomb = {};

Dodgebomb.Viewport = new Class({

  initialize: function() {
    this.setupDom();
  },
  
  getMousePosition: function(event) {
		var position = this.element.getPosition();
		return {
			x: event.page.x - position.x,
			y: event.page.y - position.y
		};
	},
  
  movePlayerViaMouse: function(event) {
    var position = this.getMousePosition(event);
    var percentage = position.x / this.element.getStyle('width').toInt() * 100;
    Dodgebomb.Singleton.player.moveTo(percentage);
  },

  setupDom: function() {
    this.element = new Element('div', { id: 'viewport' });
    this.element.inject(Dodgebomb.Singleton.element);
    this.element.addEvents({
			mouseenter: 
				function(e) {
					this.element.addEvent('mousemove', this.movePlayerViaMouse.bindWithEvent(this));
				}.bind(this),
			mouseleave: 
				function(e) {
					this.element.removeEvent('mousemove', this.movePlayerViaMouse.bindWithEvent(this));
				}.bind(this)
		});
  }

});