require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  let(:user) { build(:user) }
  let(:params) { {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
    password_confirmation: user.password
  } }

  before { @request.env['devise.mapping'] = Devise.mappings[:user] }

  describe 'respond_with' do
    context 'with valid params' do
      before { post :create, params: { user: params } }

      it 'sign up' do
        should use_before_action :configure_sign_up_params
        expect(response.status).to eq 200
        expect(JSON.parse(response.body)['payload']['email']).to eq user.email
      end
    end

    context 'with invalid params' do
      before { post :create, params: { user: {} } }

      it 'sign up' do
        expect(response.status).to eq 422
      end
    end
  end
end
