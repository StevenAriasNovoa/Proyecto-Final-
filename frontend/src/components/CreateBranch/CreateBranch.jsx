import React, { Component } from 'react';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';

class CreateBranch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            courseName: '', // Nuevo estado para almacenar el nombre del curso
            course_id: '',
            address_id: '',
            errorMessages: [],
            courses: [], // Nuevo estado para almacenar la lista de cursos
        };
    }

    async componentDidMount() {
        // Hacer una solicitud para obtener la lista de cursos
        try {
            const response = await fetch('http://localhost:3001/api/v1/courses');
            if (response.ok) {
                const courses = await response.json();
                this.setState({ courses });
            } else {
                console.error('Error al obtener la lista de cursos.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        // Buscar el ID del curso por nombre
        const selectedCourse = this.state.courses.find(course => course.name === this.state.courseName);
        const course_id = selectedCourse ? selectedCourse.id : null;

        // Verificar si se encontró el curso
        if (!course_id) {
            this.setState({
                errorMessages: ['Nombre de curso no válido. Por favor, elija un curso existente.'],
            });
            return;
        }

        const branchData = {
            name: this.state.name,
            course_id,
            address_id: this.state.address_id,
        };

        try {
            const response = await fetch('http://localhost:3001/api/v1/branches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ branch: branchData }),
            });

            if (response.ok) {
                console.log('Branch creado exitosamente');
            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.log('Errores de validación:', errorData.error);
                    this.setState({ errorMessages: errorData.error });
                } else {
                    const errorText = await response.text();
                    console.error('Error al crear el branch. Detalles:', errorText);
                }
            }
        } catch (error) {
            console.error('Error de red:', error);
        }

        this.setState({
            name: '',
            courseName: '',
            course_id: '',
            address_id: '',
        });
    };

    render() {
        return (
            <>
                <div className='main-container'>
                    <Sidebar />
                    <form onSubmit={this.handleSubmit}>
                        {this.state.errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <p>Error al crear el branch:</p>
                                <ul>
                                    {this.state.errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name">Nombre del Branch:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="courseName">Nombre del Curso:</label>
                            <input
                                type="text"
                                id="courseName"
                                name="courseName"
                                value={this.state.courseName}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="address_id">ID de la Dirección:</label>
                            <input
                                type="text"
                                id="address_id"
                                name="address_id"
                                value={this.state.address_id}
                                onChange={this.handleChange}
                            />
                        </div>

                        <button type="submit">Crear Branch</button>
                    </form>
                </div>
                <Footer />
            </>
        );
    }
}

export default CreateBranch;
