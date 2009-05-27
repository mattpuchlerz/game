require 'rubygems'
require 'sinatra'
require 'jabbify'



#
# Configuration
# 

set :jabbify_api_key, '3621a05b13564714312a53020b7852504352678f'



# 
# Routes
# 

use_in_file_templates!

get '/jabbify' do
  erb :jabbify
end

get '/send' do
  Jabbify::Comet.deliver(
    :api_key => Sinatra::Application.jabbify_api_key,
    :name    => "Server",
    :message => "yo yo yo from tha serva"
  )
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



@@jabbify

<h1>Game!</h1>

<input id="button" type="submit" value="Send!" />  

<!-- <script type="text/javascript" src="http://jabbify.com/side.js"></script> -->
<script type="text/javascript" src="javascripts/jabbify.js"></script>
<script type="text/javascript" src="javascripts/main.js"></script>