class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.references :commentable, polymorphic: true, null: false, index: true
      t.references :parent, foreign_key: {to_table: :comments}, index: true
      t.text :body

      t.timestamps
    end
  end
end
