class ActivitiesController < ApplicationController

  def index

  end

  def new
  end

  def create
    Activity.create(activity_params)
    redirect_to root_path
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def activity_params
    params.require(:activity).permit(:description)
  end

end