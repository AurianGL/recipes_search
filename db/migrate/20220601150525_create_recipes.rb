class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.integer :cook_time
      t.integer :prep_time
      t.string :ingredients, array: true, default: []
      t.string :text_ingredients
      t.float :ratings
      t.string :cuisine
      t.string :category
      t.string :author
      t.string :image

      t.timestamps
    end
  end
end
