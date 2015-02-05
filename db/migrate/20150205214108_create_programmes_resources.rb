class CreateProgrammesResources < ActiveRecord::Migration
  def change
    create_table :programmes_resources do |t|
      t.belongs_to :resource, index: true
      t.belongs_to :programme, index: true
    end
  end
end
