require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let(:user) { create(:user) }
  let(:issue) { create :issue }
  let(:comment) { create :comment, commentable: issue }

  describe 'callback' do
    it { should use_before_action :authenticate_user! }
    it { should use_before_action :set_comment }
  end

  describe 'action' do
    describe 'GET :index' do
      context 'unauthorized' do
        before { get :index, params: { commentable_id: issue.id, commentable_type: 'issue' } }

        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }
        before { comment }
        before { get :index, params: { commentable_id: issue.id, commentable_type: 'issue' } }

        it { should respond_with :ok }
        it { expect(assigns(:commentable)).to eq issue }
        it { expect(assigns(:comments)).to eq [comment] }
        it { expect(response.header['Content-Type']).to include 'application/json' }
        it { expect(JSON.parse(response.body).length).to eq 1 }
      end
    end

    describe 'POST :create' do
      let(:params) { { comment: { commentable_id: issue.id, commentable_type: 'issue', body: 'Critical error' } } }
      let(:invalid_params) { { comment: { commentable_id: issue.id, commentable_type: 'issue', body: nil } } }

      context 'unauthorized' do
        before { post :create, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }

        it 'permit params' do
          should permit(:body).for(:create, params: params).on(:comment)
        end

        it 'with valid params' do
          post :create, params: params
          should respond_with :created
          expect(assigns(:comment).body).to eq 'Critical error'
          expect(response.header['Content-Type']).to include 'application/json'
        end

        it 'with invalid params' do
          post :create, params: invalid_params
          should respond_with :unprocessable_entity
        end
      end
    end    

    describe 'PATCH :update' do
      let(:params) { { id: comment.id, comment: { body: 'Critical error' } } }
      let(:invalid_params) { { id: comment.id, comment: { body: nil } } }

      context 'unauthorized' do
        before { patch :update, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }

        it 'permit params' do
          should permit(:body).for(:update, params: params).on(:comment)
        end

        it 'with valid params' do
          patch :update, params: params
          should respond_with :ok
          expect(assigns(:comment).body).to eq 'Critical error'
          expect(response.header['Content-Type']).to include 'application/json'
        end

        it 'with invalid params' do
          patch :update, params: invalid_params
          should respond_with :unprocessable_entity
        end
      end
    end

    describe 'DELETE :destroy' do
      let(:params) { { id: comment.id } }

      context 'unauthorized' do
        before { delete :destroy, params: params }
        it { should respond_with :unauthorized }
      end

      context 'authorized' do
        before { sign_in user }
        before { @comment = FactoryBot.create(:comment, commentable: issue) }

        it 'delete' do
          expect{ delete :destroy, params: { id: @comment.id } }.to change(Comment, :count).by(-1)
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
