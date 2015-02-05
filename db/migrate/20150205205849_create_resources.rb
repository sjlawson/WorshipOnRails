class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :title
      t.text :location
      t.string :resourceType
      t.string :attribution
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :resources, :users
  end
end
