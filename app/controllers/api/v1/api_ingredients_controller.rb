class Api::V1::ApiIngredientsController < ApplicationController

  def index
    @ingredientsAll = Ingredient.all
  end

  def search_all
    @ingredientsAll = Ingredient.all
  end

  def update
    user_id = params[:user_id]
    user_ingredients = UserIngredient.where(user_id: user_id)
    user_ingredients.each do |user_ingredient|
      user_ingredient.destroy
    end
    user_ingredients = params[:user_ingredients]
    user_ingredients.each do |user_ingredient|
      if Ingredient.find_by(description: user_ingredient) == nil
        Ingredient.create(description: user_ingredient, searchvalue: user_ingredient)
      end  
      ingredient = Ingredient.find_by(description: user_ingredient)
      UserIngredient.create(user_id: user_id, ingredient_id: ingredient.id)
    end
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

  def shop_list
    if params[:shop_list_ingredients]
      user_id = params[:user_id]
      user_ingredient_shopitems = IngredientShopList.where(user_id: user_id)
      user_ingredient_shopitems.each do |user_ingredient_shopitem|
        user_ingredient_shopitem.destroy
      end
      user_ingredient_shopitems = params[:shop_list_ingredients]
      user_ingredient_shopitems.each do |user_ingredient_shopitem|
        if Ingredient.find_by(description: user_ingredient_shopitem) == nil
          Ingredient.create(description: user_ingredient_shopitem, searchvalue: user_ingredient_shopitem)
        end
        ingredient = Ingredient.find_by(description: user_ingredient_shopitem)
        IngredientShopList.create(user_id: user_id, ingredient_id: ingredient.id)
      end
      respond_to do |format|
        format.all { render :nothing => true, :status => 200 }
      end
    end
  end

  def active
    if current_user
      @active_ingredients = current_user.ingredients + current_user.list_ingredients
      @active_ingredients.uniq!
    end
  end

  def join
    @unmatched_ingredients = Ingredient.where.not(id: GroceryIngredientJoin.pluck(:ingredient_id))
  end

end