require 'rubygems'
require 'restclient' # http://github.com/adamwiggins/rest-client

module Jabbify
  class Comet
    
    attr_accessor :action, :api_key, :message, :name, :to, :type
    
    def action=(action)
      @action = action.to_sym
    end
    
    def type=(type)
      @type = type.to_sym
    end
  
    def self.deliver(options)
      [ :api_key, :name, :message ].each do |option|
        raise ArgumentError, "Missing the :#{ option } option" unless options[option]
      end

      begin
        RestClient.get 'https://jabbify.com:8443/message_push?key=123456&name=Neo&type=message&action=create&message=sweet'
        true
      rescue
        false
      end
    end
  
  end
end