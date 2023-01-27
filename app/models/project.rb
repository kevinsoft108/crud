class Project < ApplicationRecord

  has_many :issues, dependent: :destroy

  validates :title, presence: true
end
