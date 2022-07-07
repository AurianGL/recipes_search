class AddComplexityToRecipes < ActiveRecord::Migration[6.1]
    # add_column :ingredients, :complexity, type: :numeric, as: 'ingredients.length + prep_time - ratings', stored: true
    def up
      execute <<-SQL
        ALTER TABLE recipes
        ADD COLUMN complexity float GENERATED ALWAYS AS 
          (coalesce(array_length(ingredients, 1), 0) + coalesce(prep_time, 0) - coalesce(ratings, 0))
         STORED;
      SQL
    end

    def down
      remove_column :recipes, :complexity
    end
  
end
