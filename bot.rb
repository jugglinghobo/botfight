class Bot < ActiveRecord::Base

  SKELETON_CODE = <<-END
// bots can move, valid directions are: "up", "down", "left", "right"
// move example:
// var action = function(surroundings) {
//   return {"action": "move", "direction": "up"}; // move up
// }
// you can inspect your surroundings, which is a 3x3 array

var action = function(surroundings) {
  // implement this functionality...
}
  END

  after_initialize :set_random_color

  #name, code, author
  validates_presence_of :name, :author, :code, :color

  def to_s
    name
  end

  def code
    read_attribute(:code) || SKELETON_CODE
  end

  private
  def set_random_color
    self.color ||= "#%06x" % (rand * 0xffffff)
  end
end
