import React, { useState, useEffect } from 'react';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';

const CourseEdit = () => {
    const { selectedId } = useParams();

    const [courseData, setCourseData] = useState({
        name: '',
        description: '',
        registration_day: '',
        institution: '',
        requirement: '',
        favorite: false,
    });

    useEffect(() => {
    }, [selectedId]);

    useEffect(() => {
        console.log("CourseEdit - useEffect con courseId:", selectedId);
        if (selectedId) {
            // Obtener los datos del curso al cargar el componente
            fetch(`http://localhost:3001/api/v1/courses/${selectedId}`)
                .then((response) => response.json())
                .then((data) => setCourseData(data))
                .catch((error) => console.error('Error de red:', error));
        }
    }, [selectedId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/api/v1/courses/${selectedId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: courseData }),
            });

            if (response.ok) {
                // // Curso actualizado exitosamente
                // onUpdate(); // Puedes usar esta función para recargar la lista de cursos u otras acciones
                // onClose(); // Cierra el formulario de edición
            } else {
                console.error('Error al actualizar el curso');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <>
            <div className='main-container'>
                <Sidebar />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={courseData.name} onChange={handleChange} />

                    <label htmlFor="description">Descripción:</label>
                    <input type="text" id="description" name="description" value={courseData.description} onChange={handleChange} />

                    <button type="submit">Actualizar Curso</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CourseEdit;
