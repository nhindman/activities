class Outing < ActiveRecord::Base

  has_many :bundlings
  has_many :activities, through: :bundlings
end
