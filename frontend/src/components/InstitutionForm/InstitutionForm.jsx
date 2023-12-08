import React, { Component } from 'react';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';

class InstitutionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            insti_type: '', // Estado para almacenar el tipo seleccionado
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleTypeChange = (selectedType) => {
        this.setState({ insti_type: selectedType });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        // Aquí puedes realizar acciones adicionales, como enviar datos al servidor
        try {
            const response = await fetch('http://localhost:3001/api/v1/institutions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    institution: {
                        name: this.state.name,
                        insti_type: this.state.insti_type,
                    },
                }),
            });

            if (response.ok) {
                console.log('Institución creada exitosamente');
            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.log('Errores de validación:', errorData.error);
                    // Manejar errores de validación
                } else {
                    const errorText = await response.text();
                    // console.error('Error al crear la institución. Detalles:', errorText);
                }
            }
        } catch (error) {
            // console.error('Error de red:', error);
        }

        // Luego, puedes limpiar el formulario si es necesario
        this.setState({
            name: '',
            insti_type: '',
        });

        // Si se proporciona una función de devolución de llamada, llámala con los datos de la institución
        if (this.props.onInstitutionSubmit) {
            this.props.onInstitutionSubmit({
                name: this.state.name,
                insti_type: this.state.insti_type,
            });
        }
    };

    render() {
        return (
            <>
                <div className='main-container'>
                    < Sidebar/>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Nombre de la Institución:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="type">Tipo de Institución:</label>
                            <select
                                id="type"
                                name="type"
                                value={this.state.insti_type}
                                onChange={(e) => this.handleTypeChange(e.target.value)}
                            >
                                <option value="">Seleccionar Tipo</option>
                                <option value="colegio">Colegio</option>
                                <option value="universidad">Universidad</option>
                                <option value="instituto">Instituto</option>
                            </select>
                        </div>

                        <button type="submit">Agregar Institución</button>
                    </form>
                </div>
                <Footer />
            </>
        );
    }
}

export default InstitutionForm;
