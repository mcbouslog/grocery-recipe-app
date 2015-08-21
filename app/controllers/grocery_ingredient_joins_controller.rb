class GroceryIngredientJoinsController < ApplicationController
  before_action :authenticate_admin!

  def index
    @groceries = Grocery.all
    @ingredientsAll = Ingredient.all
    
    @total_groceries = @groceries.length
    @total_ingredients = @ingredientsAll.length

    @grocery_ingredients = []
    @groceries.each do |grocery|
      if grocery.ingredients.any?
        @grocery_ingredients << grocery
      end
    end
    @grocery_percent = (@grocery_ingredients.length.to_f / @total_groceries.to_f) * 100

    @ingredient_groceries = []
    @ingredientsAll.each do |ingredient|
      if ingredient.groceries.any?
        @ingredient_groceries << ingredient
      end
    end
    @ingredient_percent = (@ingredient_groceries.length.to_f / @total_ingredients.to_f) * 100

  end

  def edit
  end

  def join
    ingredient_ids = params[:ingredient_ids]
    grocery_ids = params[:grocery_ids]

    if grocery_ids.length == 1
      ingredient_ids.each do |ingredient_id|
        GroceryIngredientJoin.create(ingredient_id: ingredient_id, grocery_id: grocery_ids[0])
      end
    end

    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

  def authenticate_admin!
    unless user_signed_in? && current_user.admin
      redirect_to "/"
    end
  end

end