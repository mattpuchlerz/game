if (!$defined(Dodgebomb)) var Dodgebomb = {};

Dodgebomb.Player = new Class({
  
  initialize: function() {
    this.setupDom();
    this.x = 0;
  },
  
  moveTo: function(percentage) {
    if (percentage < 0)
      percentage = 0;
    else if (percentage > 100) 
      percentage = 100;
    
    this.x = percentage;
    this.element.setStyles({
      'left': percentage + '%',
      'margin-left': this.element.getStyle('width').toInt() * (percentage * -0.01) + 'px'
    });
    return this;
  },
  
  setupDom: function() {
    this.element = new Element('div', { id: 'player' });
    this.element.inject(Dodgebomb.Singleton.viewport.element);
  }

});