class Api::V1::ApiIngredientsController < ApplicationController

  def index
    @ingredientsAll = Ingredient.where("id < ?", 10)
  end

  def search
    @ingredientsUnmatched = Ingredient.where.not(id: GroceryIngredientJoin.pluck(:ingredient_id))
  end

  # def current_user
  #   @ingredients_current_user = {}
  #   @ingredientsAll.each do |ingredient|
  #     if ingredient.users.exists?(current_user.id)
  #       @ingredients_current_user.merge(ingredient)
  #     end
  #   end
  # end

end