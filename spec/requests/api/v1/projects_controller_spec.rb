require 'rails_helper'

RSpec.describe Api::V1::ProjectsController, type: :controller do
  let(:user) { create(:user) }
  let(:project) { create :project }

  describe 'callback' do
    it { should use_before_action :authenticate_user! }
    it { should use_before_action :set_project }
  end

  describe 'action' do
    describe 'GET :index' do
      context 'unauthorized' do
        before { get :index }

        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }
        before { project }
        before { get :index }

        it 'respond with valid json' do
          should respond_with :ok
          expect(assigns(:projects)).to eq [project]
          expect(response.header['Content-Type']).to include 'application/json'
          expect(JSON.parse(response.body).length).to eq 1
        end
      end
    end

    describe 'POST :create' do
      let(:params) { { project: { title: 'Awesome project' } } }
      let(:invalid_params) { { project: { title: nil } } }

      context 'unauthorized' do
        before { post :create, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }

        it 'permit params' do
          should permit(:title).for(:create, params: params).on(:project)
        end

        it 'with valid params' do
          post :create, params: params
          should respond_with :created
          expect(assigns(:project).title).to eq 'Awesome project'
          expect(response.header['Content-Type']).to include 'application/json'
        end

        it 'with invalid params' do
          post :create, params: invalid_params
          should respond_with :unprocessable_entity
        end
      end
    end    

    describe 'PATCH :update' do
      let(:params) { { id: project.id, project: { title: 'Awesome project' } } }
      let(:invalid_params) { { id: project.id, project: { title: nil } } }

      context 'unauthorized' do
        before { patch :update, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }

        it 'permit params' do
          should permit(:title).for(:update, params: params).on(:project)
        end

        it 'with valid params' do
          patch :update, params: params
          should respond_with :ok
          expect(assigns(:project).title).to eq 'Awesome project'
          expect(response.header['Content-Type']).to include 'application/json'
        end

        it 'with invalid params' do
          patch :update, params: invalid_params
          should respond_with :unprocessable_entity
        end
      end
    end

    describe 'DELETE :destroy' do
      let(:params) { { id: project.id } }

      context 'unauthorized' do
        before { delete :destroy, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }
        before { @project = FactoryBot.create(:project) }

        it 'delete' do
          expect{ delete :destroy, params: { id: @project.id } }.to change(Project, :count).by(-1)
        end

        it 'response' do
          delete :destroy, params: params
          should respond_with :ok
          expect(response.header['Content-Type']).to include 'application/json'
        end
      end
    end
  end
end
