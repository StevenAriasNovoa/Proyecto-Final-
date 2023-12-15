require 'rails_helper'

RSpec.describe Api::V1::CoursesController, type: :controller do
  describe 'GET /api/v1/courses' do
    it 'should get index' do
      # Usar la fábrica para crear un curso
      course = create(:course)

      # Realizar la solicitud GET al índice de cursos
      get :index

      # Verificar que la respuesta sea exitosa y que contenga el curso creado
      expect(response).to have_http_status(:success)
      expect(response.body).to include(course.name) 
    end
  end

  it 'should not create invalid course' do
    course = create(:course)
    post :create, params: { course: attributes_for(:course, name: nil) }
    expect(response).to have_http_status(:unprocessable_entity)
  end
  
  describe 'GET /api/v1/courses/:id/addresses' do
    it 'should get addresses' do
    course = create(:course)

      get :addresses, params: { id: course.id }
      expect(response).to have_http_status(:ok)
      # Agrega más expectativas según lo necesario para tu aplicación
    end
  end

end
