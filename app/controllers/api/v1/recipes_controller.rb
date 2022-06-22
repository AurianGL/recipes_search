class  Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: [:show]

  def index
    if params[:ingredients].present?
      @recipes = search
    else
      @recipes = Recipe.order(created_at: :desc).page(params[:page]).pluck(:id, :title, :ingredients, :ratings).map do |id, title, ingredients, ratings| 
        { id: id, title: title, ingredients: ingredients, ratings: ratings }
      end
    end
    render json: @recipes
  end

  def show
    render json: @recipe
  end



  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def search
    with_ingredients = params[:ingredients]
    without_ingredients = params[:without_ingredients] ?
      params[:without_ingredients].split(' ').map do |ingredient| 
      "!#{ingredient}"
    end.join(' ') : '' 
    Recipe.search_by_title_and_ingredients(with_ingredients + ' '  + without_ingredients).page(1)
  end

  def recipe_params
    params.require(:recipe).permit(:title, :cook_time, :prep_time, :ingredients, :text_ingredients, :ratings, :cuisine, :category, :author, :image)
  end
end
