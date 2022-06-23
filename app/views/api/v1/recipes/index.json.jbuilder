json.recipes @recipes.each do |recipe|
  json.partial! "api/v1/recipes/base", recipe: recipe
end