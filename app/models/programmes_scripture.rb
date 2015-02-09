class ProgrammesScripture < ActiveRecord::Base
  belongs_to :programme
  belongs_to :scripture
end
