require 'rubygems'
require 'restclient' # http://github.com/adamwiggins/rest-client

class Jabbify
  
  def self.deliver(options)
    [ :api_key, :name, :message ].each do |option|
      raise ArgumentError, "Missing the :#{ option } option" unless options.include? option
    end
  end
  
end