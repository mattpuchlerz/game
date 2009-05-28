Dodgebomb.Player = new Class({

  initialize: function() {
    this.setupDom();
  },

  setupDom: function() {
    this.player = new Element('div', { id: 'player' });
    this.player.inject($('viewport'));
  }

});