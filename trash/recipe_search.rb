class RecipeSearch

  attr_accessor :attribution, :html, :url, :text, :logo, :totalMatchCount, :facetCounts, :matches, :imageUrlsBySize, :attributes, :course, :cuisine, :holiday, :flavors, :salty, :sour, :sweet, :bitter, :meaty, :piquant, :rating, :id, :smallImageUrls, :sourceDisplayName, :totalTimeInSeconds, :ingredients, :recipeName, :criteria

  def initialize(hash)
    @attribution = hash["attribution"]
    @totalMatchCount = hash["totalMatchCount"]
    @facetCounts = hash["facetCounts"]
    @matches = hash["matches"]
      hash["matches"].each do |match|
        @imageUrlsBySize = match["imageUrlsBySize"]
        @sourceDisplayName = match["sourceDisplayName"]
        @ingredients = match["ingredients"]
        @id = match["id"]
        @smallImageUrls = match["smallImageUrls"]
        @recipeName = match["recipeName"]
        @totalTimeInSeconds = match["totalTimeInSeconds"]
        @attributes = match["attributes"]
          @course = match["attributes"]["course"]
          @cuisine = match["attributes"]["cuisine"]
          @holiday = match["attributes"]["holiday"]
        @flavors = match["flavors"]
        @rating = match["rating"]
      end
    @criteria = hash["criteria"]
  end

end