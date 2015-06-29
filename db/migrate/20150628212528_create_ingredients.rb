class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.string :description

      t.timestamps null: false
    end
  end
end
