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

get '/' do
  erb :index
end

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
    
    <title>DodgeBomb!</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <link rel="stylesheet" href="/stylesheets/application.css" type="text/css" media="screen" />  
    
  </head>

  <body>

    <%= yield %>
    
  </body>

</html>



@@index

<div id="about">
  <h1>DodgeBomb!</h1>
  <p>A simple, addicting game where you dodge&hellip; bombs! This exploration into Javascript gaming was created by <a href="http://matt.puchlerz.com">Matt&nbsp;Puchlerz</a>.</p>
</div>

<script type="text/javascript" src="/javascripts/mootools/mootools-1.2.2-core-yc.js"></script>
<script type="text/javascript" src="/javascripts/mootools/mootools-1.2.2.2-more-yc.js"></script>
<script type="text/javascript" src="/javascripts/mattpuchlerz/assets.js"></script>
<script type="text/javascript" src="/dodgebomb/javascripts/dodgebomb.js"></script>
<script type="text/javascript" src="/javascripts/application.js"></script>



@@jabbify

<h1>Jabbify Test</h1>

<input id="button" type="submit" value="Send!" />  

<!-- <script type="text/javascript" src="http://jabbify.com/side.js"></script> -->
<script type="text/javascript" src="/javascripts/jabbify/jabbify.js"></script>
<script type="text/javascript" src="/javascripts/jabbify/jabbify_test.js"></script>