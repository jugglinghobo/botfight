class AddColorToBots < ActiveRecord::Migration
  def change
    add_column :bots, :color, :string
  end
end
