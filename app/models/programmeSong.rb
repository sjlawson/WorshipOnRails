class ProgrammeSong < ActiveRecord::Base
  belongs_to :programme
  belongs_to :song
end
