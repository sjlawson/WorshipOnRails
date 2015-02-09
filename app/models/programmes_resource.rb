class ProgrammesResource < ActiveRecord::Base
  belongs_to :programme
  belongs_to :resource
end
