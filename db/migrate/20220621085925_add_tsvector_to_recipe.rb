class AddTsvectorToRecipe < ActiveRecord::Migration[6.1]
  def up
    execute <<-SQL
      ALTER TABLE recipes
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(text_ingredients, '')), 'A')
      ) STORED;
    SQL
  end

  def down
    remove_column :recipes, :searchable
  end
end
