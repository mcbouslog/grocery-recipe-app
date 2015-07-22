class RecipesController < ApplicationController

  def index
    @user_groceries_array = UserGrocery.where(user_id: current_user.id).map { |user_grocery| [user_grocery.grocery.description, user_grocery.grocery_id] }
    @user_groceries_array = @user_groceries_array.unshift(["none",nil])
    
    if @recipe_search
      @total_match_count = @recipe_search.total_match_count
    else
      @total_match_count = 0
    end
  end

  def show
  end

  def update
    search_string = ""

    if params[:ingredient_one] != ""
      search_string = Grocery.find_by(id: params[:ingredient_one]).description.gsub(" ", "+")
    elsif params[:ingredient_two] != ""
      search_string += "+" + Grocery.find_by(id: params[:ingredient_two]).description.gsub(" ", "+")
    elsif params[:ingredient_three] != ""
      search_string += "+" + Grocery.find_by(id: params[:ingredient_three]).description.gsub(" ", "+")
    elsif params[:search_term] != ""
      search_string += "+" + params[:search_term].gsub(" ", "+")
    end

    @recipe_search = RecipeSearch.new(Unirest.get("#{ENV['API_SEARCH_URL']}_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}&q=#{search_string}").body)

    puts "*** Total Match Count = " + @recipe_search.total_match_count.to_s

  end

end