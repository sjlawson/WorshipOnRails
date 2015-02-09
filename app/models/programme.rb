class Programme < ActiveRecord::Base
  belongs_to :user

  has_and_belongs_to_many :resources
  # has_and_belongs_to_many :songs
  # has_and_belongs_to_many :scriptures

  has_many :programmesSongs
  has_many :songs, through: :programmesSongs
  accepts_nested_attributes_for :programmesSongs

  has_many :programmesScriptures
  has_many :scriptures, through: :programmesScriptures
  accepts_nested_attributes_for :programmesScriptures

end
