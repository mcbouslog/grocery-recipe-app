class RecipesController < ApplicationController

  def index
    @user_groceries_array = UserGrocery.where(user_id: current_user.id).map { |user_grocery| [user_grocery.grocery.description, user_grocery.grocery_id] }
    @user_groceries_array = @user_groceries_array.unshift(["none",nil])
    if @recipe_search != nil
      @total_match_count = @recipe_search
    else
      @total_match_count = 0
    end
  end

  def show
  end

  def update
    ingredient_one = Grocery.find_by(id: params[:ingredient_one]).description
    ingredient_two = Grocery.find_by(id: params[:ingredient_two]).description
    ingredient_three = Grocery.find_by(id: params[:ingredient_three]).description
    @recipe_search = Unirest.get("#{ENV['API_SEARCH_URL']}_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}&q=#{ingredient_one}+#{ingredient_two}+#{ingredient_three}").body
    
  end

end