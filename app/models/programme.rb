class Programme < ActiveRecord::Base
  belongs_to :user

  has_many :programmeSongs
  has_many :songs, through: :programmeSongs

  accepts_nested_attributes_for :programmeSongs, :allow_destroy =>true

  has_many :programmeScriptures
  has_many :scriptures, through: :programmeScriptures

  accepts_nested_attributes_for :programmeScriptures, :allow_destroy =>true

  has_and_belongs_to_many :resources

end
