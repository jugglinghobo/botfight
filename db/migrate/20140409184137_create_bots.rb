class CreateBots < ActiveRecord::Migration
 def self.up
   create_table :bots do |t|
     t.string :author
     t.text :code
     t.timestamps
   end
 end

 def self.down
   drop_table :posts
 end

end
