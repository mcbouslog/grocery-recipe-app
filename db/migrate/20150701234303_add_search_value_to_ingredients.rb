class AddSearchValueToIngredients < ActiveRecord::Migration
  def change
    add_column :ingredients, :searchvalue, :string
  end
end
