module Recipes
  class SearchService < ApplicationService
    def initialize(ingredients, without_ingredients)
      @ingredients = ingredients
      @without_ingredients = without_ingredients
    end

    def call
      @without_ingredients = @without_ingredients ?
        @without_ingredients.split(' ').map do |ingredient| 
        "!#{ingredient}"
      end.join(' ') : ''

      {
        exact_recipes: Recipe.search_by_title_and_ingredients("#{@ingredients} #{@without_ingredients}").page(1), 
        any_recipes: Recipe.search_by_any_word(@ingredients).page(1).sort_by { |recipe| recipe.complexity }
      }
    end
  end
end