class AddPropertiesToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :font_size, :string
    add_column :songs, :font_family, :string
    add_column :songs, :text_color, :string
    add_column :songs, :bg_color, :string
    add_column :songs, :bg_opacity, :integer
    add_column :songs, :resource_id, :integer
  end
end
