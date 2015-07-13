class RemoveStockFromUserGroceries < ActiveRecord::Migration
  def change
    remove_column :user_groceries, :stock, :boolean
    remove_column :user_groceries, :shopping_list, :boolean
  end
end