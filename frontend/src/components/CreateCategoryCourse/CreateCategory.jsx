import React, { Component } from 'react';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      errorMessages: [],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const categoryData = {
      name: this.state.name,
    };

    try {
      const response = await fetch("http://localhost:3001/api/v1/categories", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryData }),
      });

      if (response.ok) {
        console.log("Categoría creada exitosamente");

        // que lo mande al otro formulario 
        // Puedes hacer algo después de que la categoría se haya creado con éxito
      } else {
        if (response.status === 422) {
          const errorData = await response.json();
          console.log('Errores de validación:', errorData.error);
          this.setState({ errorMessages: errorData.error });
        } else {
          const errorText = await response.text();
          // console.error('Error al crear la categoría. Detalles:', errorText);
        }
      }
    } catch (error) {
      // console.error('Error de red:', error);
    }

    this.setState({
      name: '',
    });
  };

  render() {
    return (
      <>
            <div className='main-container'>
        <Sidebar />
        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessages.length > 0 && (
            <div style={{ color: "red" }}>
              <p>Error al crear la categoría:</p>
              <ul>
                {this.state.errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label htmlFor="name">Nombre de la Categoría:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit">Crear Categoría</button>
        </form>

      </div>
        <Footer />
      </>
    );
  }
}

export default CreateCategory;
