class ProjectSerializer
  include JSONAPI::Serializer

  attributes :title, :assignee, :status

  attribute :created_at do |project|
    project.created_at && project.created_at.strftime('%Y-%m-%d')
  end
end
