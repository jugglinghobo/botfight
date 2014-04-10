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
  haml :"bots/new"
end

post "/bots/create" do
  @bot = Bot.new params[:bot]
  if @bot.save!
    redirect to "/bots/#{@bot.id}"
  else
    haml :"bots/new"
  end
end

get "/bots/:id" do
  @bot = Bot.find params[:id]
  haml :"bots/show"
end


class Bot < ActiveRecord::Base
  #author: string
  #name:   string
  #code:   text
end
