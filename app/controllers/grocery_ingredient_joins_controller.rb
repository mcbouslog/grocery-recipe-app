class GroceryIngredientJoinsController < ApplicationController

  def index
    @groceries = Grocery.all
    @ingredients = Ingredient.all
    
    @total_groceries = @groceries.length
    @total_ingredients = @ingredients.length

    @grocery_ingredients = []
    @groceries.each do |grocery|
      if grocery.ingredients.any?
        @grocery_ingredients << grocery
      end
    end
    @grocery_percent = (@grocery_ingredients.length.to_f / @total_groceries.to_f) * 100

    # @ingredient_groceries = []
    # @ingredients.each do |ingredient|
    #   if ingredient.groceries.any?
    #     @ingredient_groceries << ingredient
    #   end
    # end
    # @ingredient_percent = (@ingredient_groceries.length.to_f / @total_ingredients.to_f) * 100
  end

  def edit
  end

end