var viewport;

describe('DodgeBomb.Viewport', {
  
  'before all': function() {
    
    // Mock the Dodgebomb element
    Dodgebomb.Singleton.element = new Element('div').inject(document.body);
    
    viewport = new Dodgebomb.Viewport();
  },
  
  'should have a main element': function() {
    value_of( $type(viewport.element) ).should_be('element');
    value_of( viewport.element.getParent() ).should_be(Dodgebomb.Singleton.element);
  },
  
  'should have an id of "viewport" on the element': function() {
    value_of( viewport.element.getProperty('id') ).should_be('viewport');
  },
  
  'should be able to get the mouse pointer position relative to the viewport': function() {
    // Mock a event object
    var event = {
      page: {
        x: 550,
        y: 260
      }
    };
    
    // Mock the viewport's position and size on screen
    viewport.element.setStyles({
      height: '300px',
      left: '100px',
      position: 'fixed',
      top: '50px',
      width: '600px'
    });
    
    value_of( viewport.getMousePosition(event) ).should_be({
      x: 450,
      y: 210,
      xPercentage: 75,
      yPercentage: 70
    });
  }
      
});