desc "Match groceries with ingredients whose descriptions match"

task :match_groceries_ingredients => :environment do
  groceries = Grocery.all
  groceries.each do |grocery|
    if Ingredient.find_by(description: grocery.description)
      ingredient = Ingredient.find_by(description: grocery.description)
      GroceryIngredientJoin.create(grocery_id: grocery.id, ingredient_id: ingredient.id)
    end
  end
  puts "Task Complete"
end