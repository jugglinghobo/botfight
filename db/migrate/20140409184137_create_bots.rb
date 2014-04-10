class CreateBots < ActiveRecord::Migration
 def change
   create_table :bots do |t|
     t.string :author
     t.string :name
     t.text :code
     t.timestamps
   end
 end
end
