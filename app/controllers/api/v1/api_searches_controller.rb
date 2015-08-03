class Api::V1::ApiSearchesController < ApplicationController

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

end
