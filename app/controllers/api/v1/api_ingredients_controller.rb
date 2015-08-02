class Api::V1::ApiIngredientsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @ingredientsAll = Ingredient.all
  end

  def user_ingredients
    @user_ingredients = current_user.ingredients
  end

  def search
    @search_ingredients = Ingredient.all
  end

  def update
    user_ingredients = UserIngredient.where(user_id: current_user.id)
    user_ingredients.each do |user_ingredient|
      user_ingredient.destroy
    end
    user_ingredients = params[:user_ingredients]
    user_ingredients.each do |user_ingredient|
      ingredient = Ingredient.find_by(description: user_ingredient)
      UserIngredient.create(user_id: current_user.id, ingredient_id: ingredient.id)
    end
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

  def join
    @unmatched_ingredients = Ingredient.where.not(id: GroceryIngredientJoin.pluck(:ingredient_id))
  end

end