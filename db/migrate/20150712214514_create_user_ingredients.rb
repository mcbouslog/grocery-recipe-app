class CreateUserIngredients < ActiveRecord::Migration
  def change
    create_table :user_ingredients do |t|
      t.integer :user_id
      t.integer :ingredient_id
      t.boolean :stock
      t.boolean :shopping_list

      t.timestamps null: false
    end
  end
end
