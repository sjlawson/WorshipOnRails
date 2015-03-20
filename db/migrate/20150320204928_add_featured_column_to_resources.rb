class AddFeaturedColumnToResources < ActiveRecord::Migration
  def change
    add_column :resources, :featured, :boolean
    add_column :resources, :background, :boolean
  end
end
