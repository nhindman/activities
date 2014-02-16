class ActivitiesController < ApplicationController

  def index
    @activities = Activity.all
    respond_to do |format|
      format.html
      format.json { render json: @activities}
    end
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
    @activity = Pokemon.find(params[:id])
  end

  def update
    @activity = Pokemon.find(params[:id])
    @activity.update_attributes(activity_params)
    # render json: params
    render json: @activity
  end

  def destroy
    @activity = Activity.find(params[:id])
    @activity.destroy
    render json: {}
  end

  private

  def activity_params
    params.require(:activity).permit(:description)
  end

end