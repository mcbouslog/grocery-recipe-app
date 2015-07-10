desc "Pull ingredients from Yummly API"

task :strip_ingredients => :environment do
  raw_API_ingredients = Unirest.get("http://api.yummly.com/v1/api/metadata/ingredient?_app_id=#{ENV['API_ID']}&_app_key=#{ENV[API_KEY]}").body
  json_API_ingredients = raw_API_ingredients.slice!(27..-3)
  hash_API_ingredients = JSON.parse(json_API_ingredients)
  hash_API_ingredients.each do |ingredient|
    Ingredient.create(description: ingredient["description"], searchvalue: ingredient["searchValue"])
  end
  puts "Task Complete"
end