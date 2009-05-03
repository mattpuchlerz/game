require 'rubygems'
require 'sinatra'
# require 'active_support'
require 'active_support/core_ext/blank'



#
# Configuration
# 

configure do
    
  set :root, File.dirname(__FILE__)
  
  set :jabbify_api_key, '14ebb17b8da143efbf6a18772c6a8695457b852a'
  
end



# 
# Load lib files
# 

def load_or_require(file)
  (Sinatra::Application.environment == :development) ? load(file) : require(file)
end

%w[ lib ].each do |dir| 
  Dir.glob("#{dir}/**/*.rb").sort.each { |file| load_or_require file }
end



# 
# Routes
# 

get '/' do
  erb :index
end

get '/send' do
  Jabbify.send({
    :key => '14ebb17b8da143efbf6a18772c6a8695457b852a',
    :name => "Server",
    :type => "message",
    :action => "create",
    :message => "yo yo yo from tha serva"
  })
end