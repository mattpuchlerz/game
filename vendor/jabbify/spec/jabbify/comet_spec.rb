require File.join( File.dirname(__FILE__), *%w[ .. spec_helper ] )

describe Jabbify::Comet do
  
  def defaults(options = {})
    { :api_key => 'qwer1234qwer1234',
      :type    => :message,
      :action  => :create,
      :name    => 'John Doe',
      :message => 'This is the message!',
      :to      => 'Jane Doe'
    }.merge(options)
  end
  
  context "reading and writing attributes" do
    
    before(:each) do
      @comet = Jabbify::Comet.new
    end
    
    it "should be able to read/write an 'api_key' attribute" do
      @comet.api_key = 'qwer1234qwer1234'
      @comet.api_key.should == 'qwer1234qwer1234'
    end
    
    it "should be able to read/write a 'type' attribute as a symbol" do
      @comet.type = :i_am_the_type
      @comet.type.should == :i_am_the_type
      @comet.type = 'i_am_the_type'
      @comet.type.should == :i_am_the_type
    end
    
    it "should be able to read/write an 'action' attribute as a symbol" do
      @comet.action = :i_am_the_action
      @comet.action.should == :i_am_the_action
      @comet.action = 'i_am_the_action'
      @comet.action.should == :i_am_the_action
    end
    
    it "should be able to read/write a 'name' attribute" do
      @comet.name = 'John Doe'
      @comet.name.should == 'John Doe'
    end
    
    it "should be able to read/write a 'message' attribute" do
      @comet.message = 'Here is the message!'
      @comet.message.should == 'Here is the message!'
    end
    
    it "should be able to read/write a 'to' attribute" do
      @comet.to = 'Jane Doe'
      @comet.to.should == 'Jane Doe'
    end
    
  end
  
  context "delivering messages" do
    
    it do
      Jabbify::Comet.should respond_to(:deliver)
    end
    
    it "should fail if #deliver isn't passed an options hash" do
      lambda { Jabbify::Comet.deliver }.should raise_error(ArgumentError)
    end
  
    it "should fail if #deliver is passed a nil :api_key option" do
      lambda { Jabbify::Comet.deliver defaults(:api_key => nil) }.should raise_error(ArgumentError)
    end
    
    it "should fail if #deliver is passed a nil :name option" do
      lambda { Jabbify::Comet.deliver defaults(:name => nil) }.should raise_error(ArgumentError)      
    end
  
    it "should fail if #deliver is passed a nil :message option" do
      lambda { Jabbify::Comet.deliver defaults(:message => nil) }.should raise_error(ArgumentError)      
    end
    
    it "should not deliver to Jabbify if the request fails" do
      RestClient.should_receive(:get).and_raise(RuntimeError)
      Jabbify::Comet.deliver(defaults).should == false
    end
    
    it "should deliver to Jabbify if the request succeeds" do
      RestClient.should_receive(:get).and_return('body of response')
      Jabbify::Comet.deliver(defaults).should == true
    end
  
  end
  
end