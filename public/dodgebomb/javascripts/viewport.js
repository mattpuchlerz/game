Dodgebomb.Viewport = new Class({

  initialize: function() {
    this.setupDom();
  },

  setupDom: function() {
    this.element = new Element('div', { id: 'viewport' });
    this.element.inject(document.body);
  }

});