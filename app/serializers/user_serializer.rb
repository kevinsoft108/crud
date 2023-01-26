class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime('%d/%m/%Y')
  end
end
