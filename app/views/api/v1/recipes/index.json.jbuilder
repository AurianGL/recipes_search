json.exact_recipes @recipes[:exact_recipes].each do |recipe|
  json.partial! "api/v1/recipes/base", recipe: recipe
end
json.any_recipes @recipes[:any_recipes].each do |recipe|
  json.partial! "api/v1/recipes/base", recipe: recipe
end