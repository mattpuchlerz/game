require 'rubygems'
require 'sinatra'
require 'jabbify'



#
# Configuration
# 

set :root, File.expand_path( File.dirname(__FILE__) )

set :jabbify_api_key, '3621a05b13564714312a53020b7852504352678f'



# 
# Helpers
# 

helpers do
  
  def javascript_files_in(path)
    scripts = Dir.glob( Sinatra::Application.public + path + '/*.js' )
    scripts.map { |s| s.sub( Sinatra::Application.public, '' ) }
  end
  
end



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

get '/dodgebomb/specs' do
  @javascripts  = javascript_files_in '/javascripts/mootools'
	@javascripts += javascript_files_in '/javascripts/mattpuchlerz'
	@javascripts += javascript_files_in '/dodgebomb/javascripts'
	@javascripts += javascript_files_in '/dodgebomb/specs'
  erb :dodgebomb_specs, :layout => false
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
    
    <% @javascripts.each do |javascript| %>
    <script type="text/javascript" src="<%= javascript %>"></script>
    <% end if @javascripts %>
    
  </head>

  <body>

    <%= yield %>
    
  </body>

</html>



@@dodgebomb_specs

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

	<head>
		
		<title>DodgeBomb Specs</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<link rel="stylesheet" type="text/css" media="screen" href="/js_spec/stylesheets/js_spec.css" />
		
		<script type="text/javascript" src="/js_spec/javascripts/js_spec.js"></script>
		<script type="text/javascript" src="/js_spec/javascripts/diff_match_patch.js"></script>

		<% @javascripts.each do |javascript| %>
		<script type="text/javascript" src="<%= javascript %>?<%= Time.now.to_i %>=<%= Time.now.to_i %>"></script>
		<% end %>
		
	</head>

	<body></body>

</html>



@@index

<div id="about">
  <h1>DodgeBomb!</h1>
  <p>A simple, addicting game where you dodge&hellip; bombs! This exploration into Javascript gaming was created by <a href="http://matt.puchlerz.com">Matt&nbsp;Puchlerz</a>.</p>
</div>

<% 
@javascripts = %w[
  /javascripts/mootools/mootools-1.2.2-core-yc.js
  /javascripts/mootools/mootools-1.2.2.2-more-yc.js
  /javascripts/mattpuchlerz/assets.js
  /dodgebomb/javascripts/application.js
  /javascripts/application.js
]
%>



@@jabbify

<h1>Jabbify Test</h1>

<input id="button" type="submit" value="Send!" />  

<!-- <script type="text/javascript" src="http://jabbify.com/side.js"></script> -->
<script type="text/javascript" src="/javascripts/jabbify/jabbify.js"></script>
<script type="text/javascript" src="/javascripts/jabbify/jabbify_test.js"></script>