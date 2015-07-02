desc "Pull ingredients from Yummly API"

task :strip_ingredients => :environment do
  raw_API_ingredients = Unirest.get("http://api.yummly.com/v1/api/metadata/ingredient?_app_id=52c366ff&_app_key=4f4c1f14df2a45500402a9c4ff850f82").body
  json_API_ingredients = raw_API_ingredients.slice!(27..-3)
  hash_API_ingredients = JSON.parse(json_API_ingredients)
  hash_API_ingredients.each do |ingredient|
    Ingredient.create(description: ingredient["description"], searchvalue: ingredient["searchValue"])
  end
  puts "Task Complete"
end