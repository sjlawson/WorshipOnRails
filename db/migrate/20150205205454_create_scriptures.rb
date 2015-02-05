class CreateScriptures < ActiveRecord::Migration
  def change
    create_table :scriptures do |t|
      t.string :title
      t.text :content
      t.string :author
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :scriptures, :users
  end
end
