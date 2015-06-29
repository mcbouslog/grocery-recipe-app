class GroceryIngredientJoin < ActiveRecord::Base
  belongs_to :grocery
  belongs_to :ingredient
  
end
