require "rails_helper"

RSpec.describe Recipes::SearchService, type: :service do
  

  before do
    @params = {
      ingredients: "egg salt",
      without_ingredients: "buffalo"
    }
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
    @recipe_2 = {
      title: "Buffalo Chicken and Ranch Wraps",
      cook_time: 45,
      prep_time: 20,
      ingredients:
        ["1 pound thin-sliced bacon",
        "2 tablespoons bacon drippings",
        "3 pounds skinless, boneless chicken breast halves, cut into bite size pieces",
        "¼ cup Buffalo wing sauce",
        "2 tablespoons butter, melted",
        "12 (10 inch) flour tortillas",
        "1 cup diced fresh tomato",
        "¾ cup ranch dressing, divided"],
      text_ingredients:
        "1 pound thin-sliced bacon, 2 tablespoons bacon drippings, 3 pounds skinless, boneless chicken breast halves, cut into bite size pieces, ¼ cup Buffalo wing sauce, 2 tablespoons butter, melted, 12 (10 inch) flour tortillas, 1 cup diced fresh tomato, ¾ cup ranch dressing, divided",
      ratings: 4.6,
      cuisine: "",
      category: "Mexican Recipes",
      author: "figgy",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allRecipes.com%2Fuserphotos%2F614699.jpg"
    }
  end

  it "return right recipes" do
    recipes = Recipes::SearchService.call(@params[:ingredients], @params[:without_ingredients])
    expect(recipes.first.title).to eq "Golden Sweet Cornbread"
    expect(recipes.length).to eq 1
  end
end
