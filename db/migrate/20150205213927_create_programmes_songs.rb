class CreateProgrammesSongs < ActiveRecord::Migration
  def change
    create_table :programmes_songs do |t|
      t.belongs_to :programme, index: true
      t.belongs_to :song, index: true
    end
  end
end
