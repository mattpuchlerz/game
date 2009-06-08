Dodgebomb.Player = new Class({

  initialize: function() {
    this.setupDom();
  },

  setupDom: function() {
    this.element = new Element('div', { id: 'player' });
    this.element.inject(Dodgebomb.Singleton.viewport.element);
  }

});