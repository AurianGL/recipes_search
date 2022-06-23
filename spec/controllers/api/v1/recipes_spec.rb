require 'rails_helper'

RSpec.describe Api::V1::RecipesController, type: :controller do
  render_views
  before do
    @recipe = Recipe.create!(
      title: "Golden Sweet Cornbread",
      cook_time: 25,
      prep_time: 10,
      ingredients:
        ["1 cup all-purpose flour",
        "1 cup yellow cornmeal",
        "⅔ cup white sugar",
        "1 teaspoon salt",
        "3 ½ teaspoons baking powder",
        "1 egg",
        "1 cup milk",
        "⅓ cup vegetable oil"],
      text_ingredients:
        "1 cup all-purpose flour, 1 cup yellow cornmeal, ⅔ cup white sugar, 1 teaspoon salt, 3 ½ teaspoons baking powder, 1 egg, 1 cup milk, ⅓ cup vegetable oil",
      ratings: 4.74,
      cuisine: "",
      category: "Cornbread",
      author: "bluegirl",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2021%2F10%2F26%2Fcornbread-1.jpg",
    )
  end


  describe "GET /index" do
    it "return paginated index" do
      get :index, params: {page: 1}, format: :json
      expect(response).to be_successful
      expect(JSON.parse(response.body)["recipes"].length).to eq 1
    end

    it "return recipes with sugar" do 
      get :index, params: {ingredients: "sugar"}, format: :json
      expect(response).to be_successful
      expect(JSON.parse(response.body)["recipes"].length).to eq 1
    end
  end

  describe "GET /show" do
    it "return right recipe" do
      get :show, params: { id: Recipe.first.id}, format: :json
      expect(response).to be_successful
      expect(JSON.parse(response.body)['id']).to eq Recipe.first.id
    end
  end

end
