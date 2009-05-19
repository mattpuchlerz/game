require 'rubygems'
require 'sinatra'
# require 'active_support'
# require 'active_support/core_ext/blank'



#
# Configuration
# 

set :jabbify_api_key, '14ebb17b8da143efbf6a18772c6a8695457b852a'



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

use_in_file_templates!

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

__END__



@@layout

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

  <head>
  	<title>Game!</title>
  	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>	
  </head>

  <body>

    <%= yield %>
    
  </body>

</html>



@@index

<h1>Game!</h1>

<input id="button" type="submit" value="Send!" />  

<!-- <script type="text/javascript" src="http://jabbify.com/side.js"></script> -->
<script type="text/javascript" src="javascripts/jabbify.js"></script>
<script type="text/javascript" src="javascripts/main.js"></script>