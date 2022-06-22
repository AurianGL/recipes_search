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
require "test_helper"

class RecipeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
