require File.join( File.dirname(__FILE__), 'spec_helper' )

describe Jabbify do
  
  context "delivering messages" do
    
    def defaults_except(option)
      {
        :api_key => 'qwer1234qwer1234',
        :type    => :message,
        :action  => :create,
        :name    => 'John Doe',
        :message => 'This is the message!',
        :to      => 'Jane Doe'
      }.reject { |key, val| key == option }
    end
    
    it do
      Jabbify.should respond_to(:deliver)
    end
    
    it "should fail if #deliver isn't passed an options hash" do
      lambda { Jabbify.deliver }.should raise_error(ArgumentError)
    end
  
    it "should fail if #deliver isn't passed the :api_key option" do
      lambda { Jabbify.deliver defaults_except(:api_key) }.should raise_error(ArgumentError)
    end
    
    it "should fail if #deliver isn't passed the :name option" do
      lambda { Jabbify.deliver defaults_except(:name) }.should raise_error(ArgumentError)      
    end
  
    it "should fail if #deliver isn't passed the :message option" do
      lambda { Jabbify.deliver defaults_except(:message) }.should raise_error(ArgumentError)      
    end
    
    it "should deliver the message to Jabbify if all required options are passed" do
      pending
      Jabbify.deliver defaults_except
    end
  
  end
  
end