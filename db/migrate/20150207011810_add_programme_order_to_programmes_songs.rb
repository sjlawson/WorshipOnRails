class AddProgrammeOrderToProgrammesSongs < ActiveRecord::Migration
  def change
    add_column :programmes_songs, :programmeOrder, :integer
  end
end
