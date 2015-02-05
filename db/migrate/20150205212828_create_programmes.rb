class CreateProgrammes < ActiveRecord::Migration
  def change
    create_table :programmes do |t|
      t.string :title
      t.text :notes
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :songs, :users
  end
end
