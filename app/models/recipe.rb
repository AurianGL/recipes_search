# == Schema Information
#
# Table name: recipes
#
#  id               :bigint           not null, primary key
#  title            :string
#  cook_time        :integer
#  prep_time        :integer
#  ingredients      :string           default([]), is an Array
#  text_ingredients :string
#  ratings          :float
#  cuisine          :string
#  category         :string
#  author           :string
#  image            :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  searchable       :tsvector
#
class Recipe < ApplicationRecord
  paginates_per 10
  include PgSearch::Model
  pg_search_scope :search_by_title_and_ingredients, 
    against: [title: 'B', ingredients: 'A'],
    using: { tsearch: { 
      dictionary: 'english', 
      negation: true,
      tsvector_column: 'searchable'
      } }

  pg_search_scope :search_by_any_word, 
    against: [title: 'B', ingredients: 'A'],
    using: { tsearch: { 
      dictionary: 'english', 
      tsvector_column: 'searchable',
      any_word: true
      } },
      order_within_rank: "array_length (ingredients, 1) asc"
end
