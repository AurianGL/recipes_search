Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:show, :index]
    end
  end
  
  root 'pages#index'

  get '*path', to: 'pages#index'
end
