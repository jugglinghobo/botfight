class Bot < ActiveRecord::Base

  SKELETON_CODE = <<-END
// returns object of form {"action": <action>, "direction": <direction>}
// possible actions: "move", "attack"
// possible directions: "up", "down", "left", "right"
// example:
//    return {"action": "move", "direction": "up"};
action = function(surroundings) {
  // implement this functionality
  return null;
};
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
