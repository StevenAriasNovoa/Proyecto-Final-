import React, { Component } from 'react';
import { getInstitutions } from '../../apis/InstitutionsApi.jsx';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';
import "./CreateCourse.css"

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            registration_day: '',
            instiName: '',
            requirement: '',
            favorite: false,
            institutions: [],
            errorMessages: [],
        };
    }

    componentDidMount() {
        this.fetchInstitutions();
    }

    fetchInstitutions = async () => {
        try {
            const institutionsData = await getInstitutions();
            this.setState({ institutions: institutionsData });
        } catch (error) {
            console.error('Error al obtener instituciones:', error);
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const selectedInstitution = this.state.institutions.find(institution => institution.name === this.state.instiName);
        const institution_id = selectedInstitution ? selectedInstitution.id : null;

        if (!institution_id) {
            this.setState({
                errorMessages: ['Nombre de curso no válido. Por favor, elija una institución existente.'],
            });
            return;
        }

        const courseData = {
            name: this.state.name,
            institution_id,
        };

        try {
            const response = await fetch('http://localhost:3001/api/v1/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: courseData }),
            });

            if (response.ok) {
                alert('Curso creado exitosamente');
            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.log('Errores de validación:', errorData.error);
                    this.setState({ errorMessages: errorData.error });
                } else {
                    const errorText = await response.text();
                    // console.error('Error al crear el curso. Detalles:', errorText);
                }
            }
        } catch (error) {
            // console.error('Error de red:', error);
        }

        // Restaurar el estado después de enviar el formulario
        this.setState({
            name: '',
            description: '',
            registration_day: '',
            instiName: '',
            requirement: '',
            favorite: false,
        });
    };

    render() {

        return (
            <>
                <div className='main-container'>
                    <Sidebar />
                    <form onSubmit={this.handleSubmit}>
                        <h2 className='instrutions-tittle'>Crear un Nuevo Curso</h2>
                        <div className='box-fromscourse'>
                            <div>
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

                                <div className='formeditc'>
                                    <label className='instrutions'>Nombre del Curso:</label>
                                    <input className='datacourse' type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder='nombre del curso' />
                                </div>

                                <div className='formeditc'>
                                    <label className='instrutions'>Descripcion del Curso:</label>
                                    <input className='datacourse' type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder='Descripción del curso, informacion' />
                                </div>

                                <div className='formeditc'>
                                    <label className='instrutions'>Dia de matricula:</label>
                                    <input className='datacourse' type="date" name="registration_day" value={this.state.registration_day} onChange={this.handleChange} placeholder='dia de matricula' />
                                </div>

                                <div className='formeditc'>
                                    <label className='instrutions'>Nombre de la Institucion:</label>
                                    <input className='datacourse' type="text" name="instiName" value={this.state.instiName} onChange={this.handleChange} placeholder='nombre de la institucion' />
                                </div>


                                <div className='formeditc'>
                                    <label className='instrutions'>Requisitos:</label>
                                    <input className='datacourse' type="text" name="requirement" value={this.state.requirement} onChange={this.handleChange} placeholder='requerimientos ' />
                                </div>

                                <div className='formeditc'>
                                    <label className='instrutions'>Favorito:</label>
                                    <select type="text" name="favorite" value={this.state.favorite} onChange={this.handleChange}>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>

                                <button className='createcourse' type="submit">Crear Branch</button>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </>
        );
    }
}

export default CreateCourse;
