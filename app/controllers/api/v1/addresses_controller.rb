class Api::V1::AddressesController < ApplicationController
  before_action :set_address, only: %i[show edit update destroy]

  def index
    @addresses = Address.all
    render json: @addresses
  end

  def show;end

  def new
    @address = Address.new
  end

  def edit;end

  def create
    @address = Address.new(address_params)

    if @address.save
      render json: @address, status: :created
    else
      render json: { errors: @address.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @address.update(address_params)
      render json: @address, status: :ok
    else
      render json: { errors: @address.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @address.destroy

    render json: { message: "Address was successfully destroyed." }, status: :ok
  end

  private

  def set_address
    @address = Address.find(params[:id])
  end

  def address_params
    params.require(:address).permit(:name, :description, :registration_day, :requirement, :favorite)
  end
end
