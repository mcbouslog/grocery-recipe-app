class CreateIngredientShopLists < ActiveRecord::Migration
  def change
    create_table :ingredient_shop_lists do |t|
      t.integer :user_id
      t.integer :ingredient_id

      t.timestamps null: false
    end
  end
end
