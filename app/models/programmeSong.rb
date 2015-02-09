class ProgrammeSong < ActiveRecord::Base
  attr_accessible :programmeOrder
  # attr_accessible :title
  belongs_to :programme
  belongs_to :song
end
