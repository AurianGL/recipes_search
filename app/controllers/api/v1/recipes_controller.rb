class  Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: [:show]

  def index
    if params[:ingredients].present? || params[:without_ingredients].present? 
      @recipes = Recipes::SearchService.call(params[:ingredients], params[:without_ingredients])
      render "api/v1/recipes/index.json"
    else
      @recipes = Recipe.order(created_at: :desc).page(params[:page]).pluck(:id, :title, :ingredients, :ratings).map do |id, title, ingredients, ratings| 
        { id: id, title: title, ingredients: ingredients, ratings: ratings }
      end
      render json: {recipes: @recipes}
    end
  end

  def show
    render "api/v1/recipes/show.json"
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:title, :cook_time, :prep_time, :ingredients, :text_ingredients, :ratings, :cuisine, :category, :author, :image)
  end
end
