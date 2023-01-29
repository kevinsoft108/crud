# frozen_string_literal: true

class Api::V1::IssuesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: %i[index create]
  before_action :set_issue, only: %i[update destroy]

  def index
    @issues = @project.issues.order(created_at: :desc)
    render json: @issues
  end

  def create
    @issue = @project.issues.new(issue_params)

    if @issue.save
      render json: @issue, status: :created
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

  def update
    if @issue.update(issue_params)
      render json: @issue, status: :ok
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @issue.destroy
    render json: {}, status: :ok
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_issue
    @issue = Issue.find(params[:id])
  end

  def issue_params
    params.require(:issue).permit(
      :title, :assignee, :status, :description
    )
  end
end
