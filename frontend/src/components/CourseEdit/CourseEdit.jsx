import React, { useState, useEffect } from 'react';

const CourseEdit = ({ id, onClose, onUpdate }) => {
    const [courseData, setCourseData] = useState({
        name: '',
        description: '',
        registration_day: '',
        institution: '',
        requirement: '',
        favorite: false,
    });
    console.log(id);
    useEffect(() => {
        if (id !== undefined) {
            // Obtener los datos del curso al cargar el componente
            fetch(`/api/v1/courses/${id}`)
                .then((response) => response.json())
                .then((data) => setCourseData(data))
                .catch((error) => console.error('Error de red:', error));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/v1/courses/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: courseData }),
            });

            if (response.ok) {
                // Curso actualizado exitosamente
                onUpdate(); // Puedes usar esta función para recargar la lista de cursos u otras acciones
                onClose(); // Cierra el formulario de edición
            } else {
                console.error('Error al actualizar el curso');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={courseData.name} onChange={handleChange} />

            <label htmlFor="description">Descripción:</label>
            <input type="text" id="description" name="description" value={courseData.description} onChange={handleChange} />

            <button type="submit">Actualizar Curso</button>
        </form>
    );
};

export default CourseEdit;
