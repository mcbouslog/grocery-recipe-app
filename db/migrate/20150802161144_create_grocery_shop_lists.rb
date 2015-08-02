class CreateGroceryShopLists < ActiveRecord::Migration
  def change
    create_table :grocery_shop_lists do |t|
      t.integer :user_id
      t.integer :grocery_id

      t.timestamps null: false
    end
  end
end
