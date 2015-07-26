class Api::V1::ApiSearchesController < ApplicationController

  def index
    @search_string = params[:searchString]

    @search_results = Unirest.get("#{ENV['API_SEARCH_URL']}_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}&q=#{@search_string}").body

    p "==========  @search_string = " + @search_string + "=========="

    respond_to do |format|
      format.json { render :json => @search_results }
    end
  end

end
