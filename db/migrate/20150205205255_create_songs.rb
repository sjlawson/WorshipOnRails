class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.text :content
      t.string :license
      t.string :author
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :songs, :users
  end
end
