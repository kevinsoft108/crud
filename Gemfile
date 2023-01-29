source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.3"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

gem 'vite_rails'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem 'pry'
end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

gem 'rack-cors'
gem "devise", "~> 4.8"
gem 'devise-jwt', '~> 0.10.0'

gem "jsonapi-serializer", "~> 2.2"

group :test do
  gem 'rspec-rails', '~> 6.0.0'
  gem 'database_cleaner-active_record', '~> 2.0.1'
  gem 'rails-controller-testing', '~> 1.0.5'
  gem 'faker', '~> 3.1.0'
  gem 'factory_bot_rails', '~> 6.2.0'
  gem 'shoulda-matchers', '~> 5.3.0'
  gem 'simplecov', require: false
end