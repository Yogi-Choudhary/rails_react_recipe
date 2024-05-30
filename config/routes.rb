Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
      put '/update/:id', to: 'recipes#update'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end