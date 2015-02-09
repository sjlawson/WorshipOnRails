class ProgrammesSong < ActiveRecord::Base
  belongs_to :programme
  belongs_to :song
end
