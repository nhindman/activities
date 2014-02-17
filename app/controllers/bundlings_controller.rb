class BundlingsController < ApplicationController

  def index
  end

  def new
  end

  def create
    @bundling = Bundling.create(bundling_params)
    render json: @bundling
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def bundling_params
    params.require(:bundling).permit(:outing_id, :activity_id)
  end


end