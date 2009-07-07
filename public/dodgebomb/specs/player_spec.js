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
    value_of( player.moveTo(75) ).should_be(player);
    value_of( player.x ).should_be(75);
    value_of( player.element.getStyle('left') ).should_be('75%');
  },
  
  'should never move outside of the viewport': function() {
    player.moveTo(-1);
    value_of( player.x ).should_be(0);
    value_of( player.element.getStyle('left').toInt() ).should_be(0);
    
    player.moveTo(101);
    value_of( player.x ).should_be(100);
    value_of( player.element.getStyle('left') ).should_be('100%');
  },
  
  'should compensate for the players width when setting its x-position': function() {
    // Mock a few consistent values
    player.element.setStyle('width', '100px');
    
    player.moveTo(0);
    value_of( player.element.getStyle('margin-left').toInt() ).should_be(0)
    player.moveTo(75);
    value_of( player.element.getStyle('margin-left') ).should_be('-75px');
  }
  
});