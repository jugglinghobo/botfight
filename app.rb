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

get "/bots/form" do
  @bot = Bot.new
  haml :"bots/form"
end

post "/bots/create" do
  @bot = Bot.new params[:bot]
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
  haml :"bots/form"
end

post "/bots/:id/update" do
  get_bot
  if @bot.update_attributes params[:bot]
    redirect to "/bots/#{@bot.id}/edit"
  else
    haml :"bots/form"
  end
end

post "/bots/:id/delete" do
  get_bot
  if @bot.destroy
    redirect to "/arena"
  else
    redirect to "/arena"
  end
end

get "/bots/:id" do
  get_bot
  haml :"bots/bot", :layout => false
end

def get_bot
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

  def color
    self.read_attribute("color") || "#%06x" % (rand * 0xffffff)
  end
end
