# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
Recipe.destroy_all

if Recipe.count == 0
  path = File.join(Rails.root, 'db', 'seeds', 'recipes-en.json')
  records = JSON.parse(File.read(path))
  records.each do |record|
    record[:text_ingredients] = record["ingredients"].join(', ')
    Recipe.create!(record)
  end
  puts "Created #{Recipe.count} Recipes"
end