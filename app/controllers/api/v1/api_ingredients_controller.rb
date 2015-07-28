class Api::V1::ApiIngredientsController < ApplicationController

  def index
    @ingredientsAll = Ingredient.all
  end

  def search
    @ingredientsUnmatched = Ingredient.where.not(id: GroceryIngredientJoin.pluck(:ingredient_id))
  end

end