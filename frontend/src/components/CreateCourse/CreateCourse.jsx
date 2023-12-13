import React, { useState } from 'react';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        registration_day: '',
        institution_id: '',
        requirement: '',
        favorite: false,
    });

    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/v1/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: formData }),
            });

            if (response.ok) {
                console.log('Curso creado exitosamente');
                navigate('/courses');
            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.log('Errores de validación:', errorData.error);
                    setErrorMessages(errorData.error);
                } else {
                    const errorText = await response.text();
                    // console.error('Error al crear el curso. Detalles:', errorText);
                }
            }
        } catch (error) {
            console.error('Error de red:', error);
        }

        setFormData({
            name: '',
            description: '',
            registration_day: '',
            institution_id: '',
            requirement: '',
            favorite: false,
        });
    };

    return (
        <>
            <div className='main-container'>
                <Sidebar />
                <form onSubmit={handleSubmit}>
                    {errorMessages.length > 0 && (
                        <div style={{ color: 'red' }}>
                            <p>Error al crear el curso:</p>
                            <ul>
                                {errorMessages.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div>
                        <label htmlFor='name'>Course Name:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='description'>Course Description:</label>
                        <input
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='registration_day'>Registration Day:</label>
                        <input
                            type='date'
                            id='registration_day'
                            name='registration_day'
                            value={formData.registration_day}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='institution_id'>Institution ID:</label>
                        <input
                            type='text'
                            id='institution_id'
                            name='institution_id'
                            value={formData.institution_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='requirement'>Requirement:</label>
                        <input
                            type='text'
                            id='requirement'
                            name='requirement'
                            value={formData.requirement}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='favorite'>Favorite:</label>
                        <select
                            id='favorite'
                            name='favorite'
                            value={formData.favorite}
                            onChange={handleChange}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <button type='submit'>Crear Curso</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateCourse;
