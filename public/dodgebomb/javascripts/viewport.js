if (!$defined(Dodgebomb)) var Dodgebomb = {};

Dodgebomb.Viewport = new Class({

  initialize: function() {
    this.setupDom();
  },

  setupDom: function() {
    this.element = new Element('div', { id: 'viewport' });
    this.element.inject(Dodgebomb.Singleton.element);
  }

});