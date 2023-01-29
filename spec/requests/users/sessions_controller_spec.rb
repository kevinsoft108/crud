require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do
  let(:user) { create :user }
  before { @request.env['devise.mapping'] = Devise.mappings[:user] }

  describe 'respond_with' do
    before { post :create, params: { user: { email: user.email, password: user.password } } }

    it 'login' do 
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['payload']['email']).to eq user.email
      expect(JSON.parse(response.body)['payload']['full_name']).to eq user.full_name
    end
  end

  describe 'respond_to_on_destroy' do
    context 'logged in' do
      before { allow(controller).to receive(:current_user) { nil } }
      before { delete :destroy }
      it { expect(response.status).to eq 401 }
    end

    context 'not logged in' do
      before { allow(controller).to receive(:current_user) { user } }
      before { delete :destroy }

      it 'log out' do
        expect(response.status).to eq 200
      end
    end
  end
end
