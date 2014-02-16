class OutingsController < ApplicationController

  def index
  end

  def new
  end

  def create
    @outing = Outing.create(outing_params)
    render json: @outing
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def outing_params
    params.require(:outing).permit(:name)
  end


end