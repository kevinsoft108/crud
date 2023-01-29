require 'rails_helper'

RSpec.describe Api::V1::IssuesController, type: :controller do
  let(:user) { create(:user) }
  let(:project) { create :project }
  let(:issue) { create :issue, project: project }

  describe 'callback' do
    it { should use_before_action :authenticate_user! }
    it { should use_before_action :set_project }
    it { should use_before_action :set_issue }
  end

  describe 'action' do
    describe 'GET :index' do
      context 'unauthorized' do
        before { get :index, params: { project_id: project.id } }

        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }
        before { issue }

        it 'respond with valid json' do
          get :index, params: { project_id: project.id }
          should respond_with :ok
          expect(assigns(:project)).to eq project
          expect(assigns(:issues)).to eq [issue]
          expect(response.header['Content-Type']).to include 'application/json'
          expect(JSON.parse(response.body).length).to eq 1
        end
      end
    end

    describe 'POST :create' do
      let(:issue) { build(:issue, project: project, title: 'Critical error').attributes }
      let(:params) { { project_id: project.id, issue: issue } }
      let(:invalid_params) { { project_id: project.id, issue: { title: nil } } }

      context 'unauthorized' do
        before { post :create, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }

        it 'permit params' do
          should permit(:title, :description, :assignee, :status).for(:create, params: params).on(:issue)
        end

        it 'with valid params' do
          post :create, params: params
          should respond_with :created
          expect(assigns(:issue).title).to eq 'Critical error'
          expect(response.header['Content-Type']).to include 'application/json'
        end

        it 'with invalid params' do
          post :create, params: invalid_params
          should respond_with :unprocessable_entity
        end
      end
    end    

    describe 'PATCH :update' do
      let(:params) { { id: issue.id, project_id: project.id, issue: { title: 'Critical error' } } }
      let(:invalid_params) { { id: issue.id, project_id: project.id, issue: { title: nil } } }

      context 'unauthorized' do
        before { patch :update, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }

        it 'permit params' do
          should permit(:title, :description, :assignee, :status).for(:update, params: params).on(:issue)
        end

        it 'with valid params' do
          patch :update, params: params
          should respond_with :ok
          expect(assigns(:issue).title).to eq 'Critical error'
          expect(response.header['Content-Type']).to include 'application/json'
        end

        it 'with invalid params' do
          patch :update, params: invalid_params
          should respond_with :unprocessable_entity
        end
      end
    end

    describe 'DELETE :destroy' do
      let(:params) { { id: issue.id, project_id: project.id } }

      context 'unauthorized' do
        before { delete :destroy, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }
        before { @issue = FactoryBot.create(:issue, project: project) }

        it 'delete' do
          expect{ delete :destroy, params: { id: @issue.id, project_id: project.id } }.to change(Issue, :count).by(-1)
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
