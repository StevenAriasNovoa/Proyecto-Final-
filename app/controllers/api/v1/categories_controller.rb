class Api::V1::CategoriesController < ApplicationController
  before_action :set_categorie, only: %i[show edit update destroy]

  def index
    @categories = Category.all
    render json: @categories
  end

  def show; end

  def new
    @categorie = Category.new
  end

  def edit; end


  def create
    @categorie = Category.new(categorie_params)

    if @categorie.save
        render json: @categorie, status: :created
    else
        render json: { errors: categorie.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
      if @categorie.update(categorie_params)
          render json: @categorie, status: :ok
      else
          render json: { errors: categorie.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def destroy
    @categorie.destroy

    render json: { message: "categorie was successfully destroyed." }, status: :ok
  end
  
  private
  
  def set_categorie
      @categorie = categorie.find(params[:id])
  end
  
  def categorie_params
      params.require(:categorie).permit(:name, :description, :registration_day, :requirement, :favorite)
  end

end