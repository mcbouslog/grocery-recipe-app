class Api::V1::ApiIngredientsController < ApplicationController

  def index
    @ingredientsAll = Ingredient.all
  end

  def user_ingredients
    @user_ingredients = current_user.ingredients
  end

  def search
    @search_ingredients = Ingredient.all
  end

  def join
    @unmatched_ingredients = Ingredient.where.not(id: GroceryIngredientJoin.pluck(:ingredient_id))
  end

end