import React, { Component } from 'react';

class CourseForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            registration_day: '',
            institution_id: '',
            requirement: '',
            favorite: false,
            errorMessages: [],
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const courseData = {
            name: this.state.name,
            description: this.state.description,
            registration_day: this.state.registration_day,
            institution_id: this.state.institution_id,
            requirement: this.state.requirement,
            favorite: this.state.favorite,
        };

        try {
            const response = await fetch('http://localhost:3001/api/v1/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: courseData }),
            });
            console.log('Datos del curso:', courseData);

            if (response.ok) {
                console.log('Curso creado exitosamente');
            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.log('Errores de validación:', errorData.error);
                    this.setState({ errorMessages: errorData.error });

                } else {
                    const errorText = await response.text();
                    console.error('Error al crear el curso. Detalles:', errorText);
                }
            }
        } catch (error) {
            console.error('Error de red:', error);
        }

        this.setState({
            name: '',
            description: '',
            registration_day: '',
            institution_id: '',
            requirement: '',
            favorite: false,
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.errorMessages.length > 0 && (
                    <div style={{ color: 'red' }}>
                        <p>Error al crear el curso:</p>
                        <ul>
                            {this.state.errorMessages.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <label htmlFor="name">Course Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="description">Course Description:</label>
                    <input
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="registration_day">Registration Day:</label>
                    <input
                        type="date"
                        id="registration_day"
                        name="registration_day"
                        value={this.state.registration_day}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="institution_id">Institution ID:</label>
                    <input
                        type="text"
                        id="institution_id"
                        name="institution_id"
                        value={this.state.institution_id}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="requirement">Requirement:</label>
                    <input
                        type="text"
                        id="requirement"
                        name="requirement"
                        value={this.state.requirement}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="favorite">Favorite:</label>
                    <select
                        id="favorite"
                        name="favorite"
                        value={this.state.favorite}
                        onChange={this.handleChange}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>

                <button type="submit">Crear Curso</button>
            </form>
        );
    }
}

export default CourseForm;
