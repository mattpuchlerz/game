if (!$defined(Dodgebomb)) var Dodgebomb = {};

Dodgebomb.Player = new Class({
  
  initialize: function() {
    this.setupDom();
    this.x = 0;
  },
  
  moveTo: function(percentage) {
    this.x = percentage;
    this.element.setStyle('left', percentage + '%');
  },
  
  setupDom: function() {
    this.element = new Element('div', { id: 'player' });
    this.element.inject(Dodgebomb.Singleton.viewport.element);
  }

});