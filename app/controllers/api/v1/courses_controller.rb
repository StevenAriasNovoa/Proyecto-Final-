class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: %i[show  edit update destroy]

  def index
      @courses = Course.all
      render json: @courses
  end

  def show
    render json: @course
  end

  def new
    @course = Course.new
  end

  def edit; end

  def create
      @course = Course.new(course_params)
    
      if @course.save
        render json: @course, status: :created
      else
        render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
      end
    end
    


  
def update
  if @course.update(course_params)
    render json: @course, status: :ok
  else
    render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
  end
end


  def destroy
      @course.destroy
      render json: { message: "Course was successfully destroyed." }, status: :ok
  end

  private
  
  def set_course
    begin
      @course = Course.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Course not found' }, status: :not_found
    rescue StandardError => e
      render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
    end
  end
  

  def course_params
      params.require(:course).permit(:name, :description, :registration_day, :institution_id, :requirement, :favorite)
  end

end
