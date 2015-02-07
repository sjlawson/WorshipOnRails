class AddProgrammeOrderToProgrammesScriptures < ActiveRecord::Migration
  def change
    add_column :programmes_scriptures, :programmeOrder, :integer
  end
end
