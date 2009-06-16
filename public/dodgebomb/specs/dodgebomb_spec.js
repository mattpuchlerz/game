var dodgebomb;

describe('DodgeBomb', {
  
  'before all': function() {
    dodgebomb = new Dodgebomb();
  },
  
  'should have a main element accessible via the singleton': function() {
    value_of($type(Dodgebomb.Singleton.element)).should_be('element');
  },
  
  'should have an id of "dodgebomb" on the element': function() {
    value_of(Dodgebomb.Singleton.element.get('id')).should_be('dodgebomb');
  },
  
  'should set up the viewport': function() {
    value_of(Dodgebomb.Singleton.viewport).should_not_be_null();
  },
    
  'should set up the player': function() {
    value_of(Dodgebomb.Singleton.player).should_not_be_null();
  }
    
});