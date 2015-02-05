class CreateProgrammesScriptures < ActiveRecord::Migration
  def change
    create_table :programmes_scriptures do |t|
      t.belongs_to :scripture, index: true
      t.belongs_to :programme, index: true
    end
  end
end
