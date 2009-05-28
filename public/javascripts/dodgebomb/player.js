Dodgebomb.Player = new Class({

  initialize: function() {
    this.setupPlayer();
  },

  setupPlayer: function() {
    this.player = new Element('div', { id: 'player' });
    this.player.inject($('viewport'));
  }

});