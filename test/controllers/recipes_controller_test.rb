require "test_helper"

class RecipesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get Recipes_index_url
    assert_response :success
  end

  test "should get show" do
    get Recipes_show_url
    assert_response :success
  end
end
