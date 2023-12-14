import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashMessage from 'react-flash-message'
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';

const InstitutionForm = ({ onInstitutionSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        insti_type: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTypeChange = (selectedType) => {
        setFormData({ ...formData, insti_type: selectedType });
    };

    const Message = () => (
        <FlashMessage duration={5000}>
            <strong>Institucion creada exitosamente</strong>
        </FlashMessage>
    )

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }

        if (!formData.insti_type) {
            newErrors.insti_type = 'Seleccione un tipo de institución';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            // Formulario no válido, no enviar la solicitud
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/v1/institutions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    institution: {
                        name: formData.name,
                        insti_type: formData.insti_type,
                    },
                }),
            });

            if (response.ok) {
                Message();
                navigate("/create-course");
            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.log('Errores de validación:', errorData.error);
                    setErrors(errorData.error);
                } else {
                    const errorText = await response.text();
                    console.error('Error al crear la institución. Detalles:', errorText);
                }
            }
        } catch (error) {
            console.error('Error de red:', error);
        }

        // Limpiar el formulario después del envío exitoso o manejar errores
        setFormData({
            name: '',
            insti_type: '',
        });

        // Si se proporciona una función de devolución de llamada, llámala con los datos de la institución
        if (onInstitutionSubmit) {
            onInstitutionSubmit(formData);
        }
    };

    return (
        <>
            <div className='main-container'>
                <Sidebar />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre de la Institución:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="type">Tipo de Institución:</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.insti_type}
                            onChange={(e) => handleTypeChange(e.target.value)}
                        >
                            <option value="">Seleccionar Tipo</option>
                            <option value="colegio">Colegio</option>
                            <option value="universidad">Universidad</option>
                            <option value="instituto">Instituto</option>
                        </select>
                        {errors.insti_type && <p className="error-message">{errors.insti_type}</p>}
                    </div>

                    <button type="submit">Agregar Institución</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default InstitutionForm;
