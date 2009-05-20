require File.join( File.dirname(__FILE__), *%w[ .. spec_helper ] )

describe Jabbify::Comet do
  
  def defaults(options = {})
    { :api_key => 'qwer1234qwer1234',
      :type    => :i_am_the_type,
      :action  => :i_am_the_action,
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
      @comet.message = 'This is the message!'
      @comet.message.should == 'This is the message!'
    end
    
    it "should be able to read/write a 'to' attribute" do
      @comet.to = 'Jane Doe'
      @comet.to.should == 'Jane Doe'
    end
    
    it "should be able to write any attribute via a hash passed in during initialization" do
      @comet = Jabbify::Comet.new defaults
      @comet.api_key.should == 'qwer1234qwer1234'
      @comet.type.should    == :i_am_the_type
      @comet.action.should  == :i_am_the_action
      @comet.name.should    == 'John Doe'
      @comet.message.should == 'This is the message!'
      @comet.to.should      == 'Jane Doe'
    end
    
  end
  
  context "determining whether it's valid to deliver" do
    
    it "should be able to check the validity of the attributes" do
      @comet = Jabbify::Comet.new
      @comet.should respond_to(:valid?)
    end

    it "should not be valid if the 'api_key' attribute is blank" do
      @comet = Jabbify::Comet.new defaults(:api_key => nil)
      @comet.should_not be_valid
    end
    
    it "should not be valid if the 'name' attribute is blank" do
      @comet = Jabbify::Comet.new defaults(:name => nil)
      @comet.should_not be_valid
    end
  
    it "should not be valid if the 'message' attribute is blank" do
      @comet = Jabbify::Comet.new defaults(:message => nil)
      @comet.should_not be_valid
    end
    
    it "should be valid if all attributes are provided" do
      @comet = Jabbify::Comet.new defaults
      @comet.should be_valid
    end
    
  end
    
  context "delivering messages" do
    
    it "should be able to deliver messages" do
      @comet = Jabbify::Comet.new
      @comet.should respond_to(:deliver)
    end
    
    it "should not deliver if any attributes are invalid" do
      @comet = Jabbify::Comet.new defaults(:api_key => nil)
      @comet.deliver.should == false
    end
    
    it "should not deliver if the request fails" do
      RestClient.should_receive(:get).and_raise(RuntimeError)
      @comet = Jabbify::Comet.new defaults
      @comet.deliver.should == false
    end
    
    it "should deliver if the request succeeds" do
      RestClient.should_receive(:get).and_return('body of response')
      @comet = Jabbify::Comet.new defaults
      @comet.deliver.should == true
    end
    
    it "should be able to handle one-off deliveries via a class method" do
      RestClient.should_receive(:get).and_return('body of response')
      Jabbify::Comet.deliver(defaults).should == true
    end
  
  end
  
end