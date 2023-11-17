Rails.application.routes.draw do
# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
# api/config/routes
  get 'private/test'
  devise_for :users, 
    path: '', 
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

  match '*path', to: 'application#allow_cross_origin_requests', via: [:options]

    namespace :api do
      namespace :v1 do
        resources :courses
        resources :institutions
        resources :users
        resources :categories
        resources :addresses
        resources :branchs
    end
  end

end

