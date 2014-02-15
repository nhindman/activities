class ActivitiesController < ApplicationController

  def index

  end

  def new
  end

  def create
    @activity = Activity.create(activity_params)
    render json: @activity
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