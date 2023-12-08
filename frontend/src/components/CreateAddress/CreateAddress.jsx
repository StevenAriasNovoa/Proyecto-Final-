import React, { Component } from 'react';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';

class CreateLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            province: '',
            canton: '',
            district: '',
            neighborhood: '',
            zip_code: '',
            errorMessages: [],
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const addressData = {
            province: this.state.province,
            canton: this.state.canton,
            district: this.state.district,
            neighborhood: this.state.neighborhood,
            zip_code: this.state.zip_code,
        };
        try {
            const response = await fetch('http://localhost:3001/api/v1/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: addressData }),
            });

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
            province: '',
            canton: '',
            district: '',
            neighborhood: '',
            zip_code: '',
        });
    };

    render() {
        return (
            <>
                <div className="main-container">

                    <Sidebar />
                    <form onSubmit={this.handleSubmit}>
                        {this.state.errorMessages.length > 0 && (
                            <div style={{ color: 'red' }}>
                                <p>Error al crear la ubicación:</p>
                                <ul>
                                    {this.state.errorMessages.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div>
                            <label htmlFor="province">Province:</label>
                            <input
                                type="text"
                                id="province"
                                name="province"
                                value={this.state.province}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="canton">Canton:</label>
                            <input
                                type="text"
                                id="canton"
                                name="canton"
                                value={this.state.canton}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="district">District:</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                value={this.state.district}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor='neighborhood'>Neighborhood:</label>
                            <input
                                type="text"
                                id='neighborhood'
                                name='neighborhood'
                                value={this.state.neighborhood}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="zipCode">Zip Code:</label>
                            <input
                                type="text"
                                id="zip_code"
                                name="zip_code"
                                value={this.state.zip_code}
                                onChange={this.handleChange}
                            />
                        </div>

                        <button type="submit">Crear Ubicación</button>
                    </form>
                </div>
                <Footer />
            </>
        );
    }
}

export default CreateLocation;
