require 'sinatra'
require 'sinatra/activerecord'
require './environment'

require 'haml'
require 'sass'

get "/" do
  redirect to "/bots"
end

get "/bots" do
  @bots = Bot.all
  haml :"bots/index"
end

get "/bots/new" do
  @bot = Bot.new
  haml :"bots/new"
end

post "/bots/create" do
  @bot = Bot.new params[:bot]
  if @bot.save
    redirect to "/bots/#{@bot.id}"
  else
    haml :"bots/new"
  end
end

get "/bots/:id" do
  @bot = Bot.find params[:id]
  haml :"bots/show"
end

# sass stylesheet hack
SASS_DIR = File.expand_path("../public/stylesheets", __FILE__)
get "/stylesheets/:stylesheet.css" do |stylesheet|
  content_type "text/css"
  template = File.read(File.join(SASS_DIR, "#{stylesheet}.scss"))
  scss template
end

class Bot < ActiveRecord::Base
  #name, code, author
  validates_presence_of :name, :author, :code
  def to_s
    name
  end
end
