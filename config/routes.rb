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
      resources :projects, except: %i[new show] do
        resources :issues, except: %i[new show]
      end

      resources :comments, except: %i[new show]
    end
  end

  get '*path', to: 'homes#index'
end
