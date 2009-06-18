var player;

describe('DodgeBomb.Player', {
  
  'before all': function() {
    
    // Mock the viewport's element
    Dodgebomb.Singleton.viewport = {
      'element': new Element('div').inject(document.body)
    }
    
    player = new Dodgebomb.Player();
  },
  
  'should have a main element': function() {
    value_of($type(player.element)).should_be('element');
    value_of(player.element.getParent()).should_be(Dodgebomb.Singleton.viewport.element);
  },
  
  'should have an id of "player" on the element': function() {
    value_of(player.element.getProperty('id')).should_be('player');
  },
  
  'should be able to get the current location on the x-axis': function() {
    value_of(player.x).should_be(0);
  },
  
  'should be able to reposition along its x-axis': function() {
    player.moveTo(75);
    value_of(player.x).should_be(75);
    value_of(player.element.get('left')).should_be('75%');
  }
  
});