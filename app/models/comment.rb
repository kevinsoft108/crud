class Comment < ApplicationRecord

  belongs_to :user
  belongs_to :commentable, polymorphic: true
  belongs_to :parent, optional: true, class_name: 'Comment'

  validates :body, presence: true
end
