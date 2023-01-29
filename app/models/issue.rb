class Issue < ApplicationRecord

  belongs_to :project
  has_many :comments, as: :commentable, dependent: :destroy

  enum status: {'Active': 1, 'On Hold': 2, 'Resolved': 3, 'Closed': 4}

  validates :title, presence: true
  validates :assignee, presence: true
end
