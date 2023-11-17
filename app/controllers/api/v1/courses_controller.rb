class Api::V1::CoursesController < ApplicationController
    before_action :set_course, only: %i[show edit update destroy]

    def index
        @courses = Course.all
        render json: @courses
    end

    def show; end

    def new
        @course = Course.new
    end

    def edit; end

    def create
        @course = Course.new(course_params)

        if @course.save
            render json: @course, status: :created
        else
            render json: { error: @course.errors.full_messages }, status: :unprocessable_entity
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
        @course = Course.find(params[:id])
    end

    def course_params
        params.require(:course).permit(:name, :description, :registration_day, :requirement, :favorite)
    end
end
