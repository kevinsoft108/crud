class Issue < ApplicationRecord

  belongs_to :project

  enum status: {'Active': 1, 'On Hold': 2, 'Resolved': 3}

  validates :title, presence: true
  validates :assignee, presence: true
end
