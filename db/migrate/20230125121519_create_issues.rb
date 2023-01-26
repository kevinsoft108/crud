class CreateIssues < ActiveRecord::Migration[7.0]
  def change
    create_table :issues do |t|
      t.references :project, index: true
      t.string :title
      t.string :assignee
      t.integer :status, allow_null: false, default: 1
    
      t.timestamps
    end
  end
end
