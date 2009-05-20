require File.join( File.dirname(__FILE__), 'spec_helper' )

describe Jabbify do
  
  def defaults(options = {})
    { :api_key => 'qwer1234qwer1234',
      :type    => :message,
      :action  => :create,
      :name    => 'John Doe',
      :message => 'This is the message!',
      :to      => 'Jane Doe'
    }.merge(options)
  end
  
  context "delivering messages" do
    
    it do
      Jabbify.should respond_to(:deliver)
    end
    
    it "should fail if #deliver isn't passed an options hash" do
      lambda { Jabbify.deliver }.should raise_error(ArgumentError)
    end
  
    it "should fail if #deliver is passed a nil :api_key option" do
      lambda { Jabbify.deliver defaults(:api_key => nil) }.should raise_error(ArgumentError)
    end
    
    it "should fail if #deliver is passed a nil :name option" do
      lambda { Jabbify.deliver defaults(:name => nil) }.should raise_error(ArgumentError)      
    end
  
    it "should fail if #deliver is passed a nil :message option" do
      lambda { Jabbify.deliver defaults(:message => nil) }.should raise_error(ArgumentError)      
    end
    
    it "should not deliver to Jabbify if the request fails" do
      RestClient.should_receive(:get).and_raise(RuntimeError)
      Jabbify.deliver(defaults).should == false
    end
    
    it "should deliver to Jabbify if the request succeeds" do
      RestClient.should_receive(:get).and_return('body of response')
      Jabbify.deliver(defaults).should == true
    end
  
  end
  
end