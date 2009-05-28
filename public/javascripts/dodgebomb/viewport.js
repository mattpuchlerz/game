Dodgebomb.Viewport = new Class({

  initialize: function() {
    this.setupDom();
  },

  setupDom: function() {
    this.player = new Element('div', { id: 'viewport' });
    this.player.inject(document.body);
  }

});