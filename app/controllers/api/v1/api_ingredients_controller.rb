class Api::V1::ApiIngredientsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @ingredientsAll = Ingredient.all
  end

  def user_ingredients
    @user_ingredients = current_user.ingredients
  end

  def grocery_search
    @grocery_search_ingredients = Ingredient.all
  end

  def update
    user_ingredients = UserIngredient.where(user_id: current_user.id)
    user_ingredients.each do |user_ingredient|
      user_ingredient.destroy
    end
    user_ingredients = params[:user_ingredients]
    user_ingredients.each do |user_ingredient|
      if Ingredient.find_by(description: user_ingredient) == nil
        Ingredient.create(description: user_ingredient, searchvalue: user_ingredient)
      end  
      ingredient = Ingredient.find_by(description: user_ingredient)
      UserIngredient.create(user_id: current_user.id, ingredient_id: ingredient.id)
    end
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

  def shop_list
    user_ingredient_shopitems = IngredientShopList.where(user_id: current_user.id)
    user_ingredient_shopitems.each do |user_ingredient_shopitem|
      user_ingredient_shopitem.destroy
    end
    user_ingredient_shopitems = params[:shop_list_ingredients]
    user_ingredient_shopitems.each do |user_ingredient_shopitem|
      if Ingredient.find_by(description: user_ingredient_shopitem) == nil
        Ingredient.create(description: user_ingredient_shopitem, searchvalue: user_ingredient_shopitem)
      end
      ingredient = Ingredient.find_by(description: user_ingredient_shopitem)
      IngredientShopList.create(user_id: current_user.id, ingredient_id: ingredient.id)
    end
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

  def recipe_search
    @recipe_ingredients = current_user.ingredients + current_user.list_ingredients
    @recipe_ingredients.uniq!
  end

  def join
    @unmatched_ingredients = Ingredient.where.not(id: GroceryIngredientJoin.pluck(:ingredient_id))
  end

end