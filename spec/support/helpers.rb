# require 'support/helpers/session_helpers'
require 'support/helpers/request_helpers'
RSpec.configure do |config|
  # config.include Features::SessionHelpers, type: :feature
  config.include RequestHelpers, type: :request
end
