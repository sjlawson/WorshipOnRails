class AddPropertiesToScriptures < ActiveRecord::Migration
  def change
    add_column :scriptures, :font_size, :string
    add_column :scriptures, :font_family, :string
    add_column :scriptures, :text_color, :string
    add_column :scriptures, :bg_color, :string
    add_column :scriptures, :bg_opacity, :integer
    add_column :scriptures, :resource_id, :integer
  end
end
