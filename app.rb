require 'sinatra'
require 'sinatra/activerecord'
require 'json'
require './environment'

require 'glorify'
require 'haml'
require 'sass'

require './bot'

get "/" do
  redirect to "/arena"
end

get "/about" do
  @content = File.open("#{File.dirname(__FILE__)}/views/about.md", "rb").read
  haml :about
end

get "/arena" do
  @bots = Bot.all
  haml :arena
end

get "/bots/form" do
  @bot = Bot.new
  get_manual
  haml :"bots/form"
end

post "/bots/create" do
  @bot = Bot.new params[:bot]
  get_manual
  if @bot.save
    redirect to "/bots/#{@bot.id}/edit"
  else
    haml :"bots/form"
  end
end

get "/bots/:id.json" do
  get_bot
  @bot.to_json
end

get "/bots/:id/edit" do
  get_bot
  get_manual
  haml :"bots/form"
end

post "/bots/:id/update" do
  get_bot
  get_manual
  if @bot.update_attributes params[:bot]
    redirect to "/bots/#{@bot.id}/edit"
  else
    haml :"bots/form"
  end
end

post "/bots/:id/delete" do
  get_bot
  @bot.destroy
  redirect to "/arena"
end

get "/bots/:id" do
  get_bot
  haml :"bots/bot", :layout => false
end

def get_bot
  @bot = Bot.find params[:id]
end

def get_manual
  @manual = File.open("#{File.dirname(__FILE__)}/views/manual.md", "rb").read
end

# sass stylesheet hack
SASS_DIR = File.expand_path("../public/stylesheets", __FILE__)
get "/stylesheets/:stylesheet.css" do |stylesheet|
  content_type "text/css"
  template = File.read(File.join(SASS_DIR, "#{stylesheet}.scss"))
  scss template
end

