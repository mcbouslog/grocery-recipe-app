class CreateGroceries < ActiveRecord::Migration
  def change
    create_table :groceries do |t|
      t.string :description
      t.string :grocery_category
      t.integer :score_factor

      t.timestamps null: false
    end
  end
end
