require 'sinatra'
require 'sinatra/activerecord'
require 'json'
require './environment'

require 'glorify'
require 'haml'
require 'sass'

get "/" do
  redirect to "/arena"
end

get "/about" do
  render :about
end

get "/arena" do
  @bots = Bot.all
  haml :arena
end

get "/bots" do
  @bots = Bot.all
  @content = File.open("#{File.dirname(__FILE__)}/views/index.md", "rb").read
  haml :index
end

get "/bots/form" do
  @bot = Bot.new
  haml :"bots/form"
end

post "/bots/create" do
  @bot = Bot.new params[:bot]
  if @bot.save
    redirect to "/bots/#{@bot.id}"
  else
    haml :"bots/form"
  end
end

get "/bots/:id.json" do
  get_post
  @bot.to_json
end

get "/bots/:id/edit" do
  get_post
  haml :"bots/form"
end

post "/bots/:id/update" do
  get_post
  if @bot.update_attributes params[:bot]
    redirect to "/bots/#{@bot.id}"
  else
    haml :"bots/form"
  end
end

post "/bots/:id/delete" do
  get_post
  if @bot.destroy
    redirect to "/bots"
  else
    redirect to "/show"
  end
end

def get_post
  @bot = Bot.find params[:id]
end

# sass stylesheet hack
SASS_DIR = File.expand_path("../public/stylesheets", __FILE__)
get "/stylesheets/:stylesheet.css" do |stylesheet|
  content_type "text/css"
  template = File.read(File.join(SASS_DIR, "#{stylesheet}.scss"))
  scss template
end

class Bot < ActiveRecord::Base

  SKELETON_CODE = <<-END
// Bots have three possible actions. One of those can be executed every turn.
// move:   [up, down, left, right] return {"move": "u"}; // move up
// attack: [up, down, left, right] return {"attack": "l"}; // attack to left
// clone:  [up, down, left, right] return {"clone": "d"}; // insert clone below
//
// you can inspect your surroundings, which is a 3x3 array

var action = function(surroundings) {
  // implement this functionality...
}
  END

  #name, code, author
  validates_presence_of :name, :author, :code

  def to_s
    name
  end

  def code
    read_attribute(:code) || SKELETON_CODE
  end
end
