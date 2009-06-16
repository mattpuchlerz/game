var viewport;

describe('DodgeBomb.Viewport', {
  
  'before all': function() {
    
    // Mock the Dodgebomb element
    Dodgebomb.Singleton.element = new Element('div').inject(document.body);
    
    viewport = new Dodgebomb.Viewport();
  },
  
  'should have a main element': function() {
    value_of($type(viewport.element)).should_be('element');
    value_of(viewport.element.getParent()).should_be(Dodgebomb.Singleton.element);
  },
  
  'should have an id of "viewport" on the element': function() {
    value_of(viewport.element.getProperty('id')).should_be('viewport');
  }
    
});