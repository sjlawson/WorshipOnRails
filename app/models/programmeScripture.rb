class ProgrammeScripture < ActiveRecord::Base
  attr_accessible :programmeOrder

  belongs_to :programme
  belongs_to :scripture
end
