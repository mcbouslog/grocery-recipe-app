class RecipeSearch

  attr_accessor :attribution, :totalMatchCount, :facetCounts, :matches, :criteria

  def initialize(hash)
    @attribution = hash["attribution"]
    @totalMatchCount = hash["totalMatchCount"]
    @facetCounts = hash["facetCounts"]
    @matches = hash["matches"]
    @criteria = hash["criteria"]
  end

end