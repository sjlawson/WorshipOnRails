class User < ActiveRecord::Base
  has_many :songs
  has_many :scriptures
  has_many :resources
  has_many :programmes

  # Include default devise modules. Others available are:
  #  :registerable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
end
