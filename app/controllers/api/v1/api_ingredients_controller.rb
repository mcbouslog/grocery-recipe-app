class Api::V1::ApiIngredientsController < ApplicationController

  def index
    @ingredients = Ingredient.all
  end

  def user
    @user_ingredients = UserIngredient.where(user_id: current_user.id)
  end

end