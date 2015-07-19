class RecipeSearch

  attr_accessor :attribution, :total_match_count, :facet_counts, :matches, :criteria

  def initialize(hash)
    @attribution = hash["attribution"]
    @total_match_count = hash["totalMatchCount"]
    @facet_counts = hash["facetCounts"]
    @matches = hash["matches"]
    @criteria = hash["criteria"]
  end

end