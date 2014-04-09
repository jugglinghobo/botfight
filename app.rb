require 'sinatra'
require 'sinatra/activerecord'
require './environments'

require 'haml'
require 'sass'

get '/' do
  haml :index
end

get '/bots' do
  haml :'bots/index'
end

get '/bots/new' do
  haml :'bots/new'
end

post '/bots/create' do
  @bot = Bot.new params[:bot]
end

class Bot < ActiveRecord::Base
  #author: string
  #code: text
end
