class CreateUserShoppingLists < ActiveRecord::Migration
  def change
    create_table :user_shopping_lists do |t|
      t.integer :user_id
      t.integer :grocery_id
      t.integer :ingredient_id

      t.timestamps null: false
    end
  end
end
