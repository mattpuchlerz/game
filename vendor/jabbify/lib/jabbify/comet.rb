require 'rubygems'
require 'restclient' # http://github.com/adamwiggins/rest-client

module Jabbify
  class Comet
    
    attr_accessor :action, :api_key, :message, :name, :to, :type
    
    def initialize(options = {})
      options.each_pair { |key, val| send("#{ key }=", val) }
    end
    
    def action=(action)
      @action = action.to_sym
    end
    
    def deliver
      return false unless valid?
      
      begin
        RestClient.post 'https://jabbify.com:8443/message_push', uri_params
        true
      rescue
        false
      end
    end
    
    def type=(type)
      @type = type.to_sym
    end
    
    def uri_params
      { 
        :action  => action,
        :key     => api_key,
        :message => message,
        :name    => name,
        :to      => to,
        :type    => type 
      }
    end
    
    def valid?
      %w[ api_key name message ].each do |attribute|
        return false if send(attribute).nil? 
      end
      true
    end
    
    def self.deliver(options)
      new(options).deliver
    end
    
  end
end