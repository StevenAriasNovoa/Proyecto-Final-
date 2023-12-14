import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';

const CreateCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryData = {
      name: formData.name,
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
        alert("Categoría creada exitosamente");
        setErrorMessages([]); // Clear error messages on success
        navigate('/create-category-courses'); 
      } else {
        if (response.status === 422) {
          const errorData = await response.json();
          console.log('Errores de validación:', errorData.error);
          setErrorMessages(errorData.error);
        } else {
          const errorText = await response.text();
          console.error('Error al crear la categoría. Detalles:', errorText);
        }
      }
    } catch (error) {
      console.error('Error de red:', error);
    }

    setFormData({
      name: '',
    });
  };

  return (
    <>
      <div className='main-container'>
        <Sidebar />
        <form onSubmit={handleSubmit}>
          {errorMessages.length > 0 && (
            <div style={{ color: "red" }}>
              <p>Error al crear la categoría:</p>
              <ul>
                {errorMessages.map((error, index) => (
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
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Crear Categoría</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateCategory;
