desc "Add score_factor based on grocery category"

task :score_factor_based_category => :environment do
  
  bakery_groceries = Grocery.where(grocery_category: "bakery")
  bakery_groceries.each do |bakery_grocery|
    bakery_grocery.update(score_factor: 0.50)
  end
  
  dairy_groceries = Grocery.where(grocery_category: "dairy")
  dairy_groceries.each do |dairy_grocery|
    dairy_grocery.update(score_factor: 0.60)
  end
  
  meat_groceries = Grocery.where(grocery_category: "meat")
  meat_groceries.each do |meat_grocery|
    meat_grocery.update(score_factor: 0.40)
  end
  
  other_dry_groceries = Grocery.where(grocery_category: "other_dry")
  other_dry_groceries.each do |other_dry_grocery|
    other_dry_grocery.update(score_factor: 0.70)
  end
  
  other_frig_groceries = Grocery.where(grocery_category: "other_frig")
  other_frig_groceries.each do |other_frig_grocery|
    other_frig_grocery.update(score_factor: 0.70)
  end

  produce_groceries = Grocery.where(grocery_category: "produce")
  produce_groceries.each do |produce_grocery|
    produce_grocery.update(score_factor: 0.40)
  end

  sauces_groceries = Grocery.where(grocery_category: "sauces")
  sauces_groceries.each do |sauces_grocery|
    sauces_grocery.update(score_factor: 0.70)
  end

  seafood_groceries = Grocery.where(grocery_category: "seafood")
  seafood_groceries.each do |seafood_grocery|
    seafood_grocery.update(score_factor: 0.40)
  end

  spices_groceries = Grocery.where(grocery_category: "spices")
  spices_groceries.each do |spices_grocery|
    spices_grocery.update(score_factor: 0.80)
  end

  puts "Task Complete"

end