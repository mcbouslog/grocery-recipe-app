class RemoveStockFromUserIngredients < ActiveRecord::Migration
  def change
    remove_column :user_ingredients, :stock, :boolean
    remove_column :user_ingredients, :shopping_list, :boolean
  end
end
