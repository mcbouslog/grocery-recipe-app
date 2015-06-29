class CreateGroceryIngredientJoins < ActiveRecord::Migration
  def change
    create_table :grocery_ingredient_joins do |t|
      t.integer :grocery_id
      t.integer :ingredient_id

      t.timestamps null: false
    end
  end
end
