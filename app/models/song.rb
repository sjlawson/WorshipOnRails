class Song < ActiveRecord::Base
  belongs_to :user

  has_many :programmeSongs
  has_many :programmes, through: :programmeSongs

end
