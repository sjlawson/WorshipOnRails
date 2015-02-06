class Programme < ActiveRecord::Base
  belongs_to :user

  has_and_belongs_to_many :songs
  has_and_belongs_to_many :scriptures
  has_and_belongs_to_many :resources

end
