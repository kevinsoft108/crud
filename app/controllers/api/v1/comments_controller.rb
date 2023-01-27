# frozen_string_literal: true

class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment, only: %i[update destroy]

  def index
    @commentable = params[:commentable_type].classify.constantize.find(params[:commentable_id])
    @comments = @commentable.comments.order(created_at: :desc)
    render json: @comments
  end

  def create
    @commentable = params[:comment][:commentable_type].classify.constantize.find(params[:comment][:commentable_id])
    @comment = @commentable.comments.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment)
      .permit(:id, :body, :body)
      .merge(user: current_user)
  end
end
