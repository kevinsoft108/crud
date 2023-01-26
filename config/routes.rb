Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root 'homes#index' 

  namespace :api do
    namespace :v1 do
      resources :projects, except: %i[new] do
        resources :issues, except: %i[new]
      end
    end
  end

  get '*path', to: 'homes#index'
end
