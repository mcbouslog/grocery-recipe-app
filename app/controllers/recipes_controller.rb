class RecipesController < ApplicationController

  def index
  end

  def show
  end

  def search
    search_string = params[:searchString]

    search_result = RecipeSearch.new(Unirest.get("#{ENV['API_SEARCH_URL']}_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}&q=#{search_string}").body)

    puts "========= Total Match Count = " + search_result.total_match_count.to_s
  end

end