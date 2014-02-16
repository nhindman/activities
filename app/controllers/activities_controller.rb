class ActivitiesController < ApplicationController

  def index
    @activities = Activity.all.order("id")
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
    @activity = Activity.find(params[:id])
  end

  def update
    @activity = Activity.find(params[:id])
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