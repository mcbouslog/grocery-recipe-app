class Api::V1::ApiSearchesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @search_string = params[:searchString]

    # @search_results = Unirest.get("#{ENV['API_SEARCH_URL']}_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}&q=#{@search_string}&maxResult=50&start=0").body

    # File.open('search_results.dat', 'w+') do |f|  
    #   Marshal.dump(@search_results, f)  
    # end

    File.open('search_results.dat') do |f|  
      @search_results = Marshal.load(f)  
    end

    respond_to do |format|
      format.json { render :json => @search_results }
    end
  end

  def show
    @recipe_id = params[:recipeId]

    # @recipe_result = Unirest.get("#{ENV['API_RECIPE_URL']}#{@recipe_id}?_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}").body

    # File.open('recipe_result.dat', 'w+') do |f|  
    #   Marshal.dump(@recipe_result, f)  
    # end

    File.open('recipe_result.dat') do |f|  
      @recipe_result = Marshal.load(f)  
    end

    respond_to do |format|
      format.json { render :json => @recipe_result }
    end
  end

  def favorite_recipes
    user_recipes = UserRecipe.where(user_id: current_user.id)
    @fav_recipes = []
    
    user_recipes.each do |user_recipe|
      @recipe_detail = Unirest.get("#{ENV['API_RECIPE_URL']}#{user_recipe.recipe_id}?_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}").body
      @fav_recipes << @recipe_detail
    end
    
    # File.open('fav_recipes.dat', 'w+') do |f|  
    #   Marshal.dump(@fav_recipes, f)  
    # end

    # File.open('fav_recipes.dat') do |f|  
    #   @fav_recipes = Marshal.load(f)  
    # end

    respond_to do |format|
      format.json { render :json => @fav_recipes }
    end
  end

  def min_fav_recipes
    @min_user_recipes = UserRecipe.where(user_id: current_user.id)
  end

  def update_favorites
    recipe_id = params[:fav_recipe_id]
    action = params[:fav_action]
    if action == "create"
      UserRecipe.create(user_id: current_user.id, recipe_id: recipe_id)
    end
    if action == "destroy"
      destroy_favs = UserRecipe.where("user_id = ? AND recipe_id = ?", current_user.id, recipe_id)
      unless destroy_favs == nil
        destroy_favs.each do |destroy_fav|
          destroy_fav.destroy
        end
      end
    end
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

end
