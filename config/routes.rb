Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: :login,
    sign_out: :logout,
    registration: :signup
  },
  controllers: {
    sessions: 'users/sessions',
    registration: 'users/registration'
  }

  root 'homes#index' 

  # namespace :api do
  #   namespace :v1 do
  #     resources :sounds, only: [:index]
  #     end
  #   end
  # end
end
