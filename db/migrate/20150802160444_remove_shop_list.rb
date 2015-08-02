class RemoveShopList < ActiveRecord::Migration
  def change
    drop_table :user_shopping_lists
  end
end
