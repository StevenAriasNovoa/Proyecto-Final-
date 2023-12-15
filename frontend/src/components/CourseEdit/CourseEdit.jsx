import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner.jsx';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInstitutionName } from '../../apis/InstitutionsApi.jsx'

const CourseEdit = () => {
    const navigate = useNavigate();
    const { selectedId } = useParams();

    const [courseData, setCourseData] = useState({
        name: '',
        description: '',
        registration_day: '',
        institutionName: '',
        requirement: '',
        favorite: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);
                if (selectedId) {
                    const response = await fetch(`http://localhost:3001/api/v1/courses/${selectedId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setCourseData(data);
                    } else {
                        console.error('Error al obtener datos del curso');
                    }
                }
            } catch (error) {
                console.error('Error de red:', error);
                setError('Error al obtener datos del curso');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [selectedId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Convertir el nombre de la institución en su correspondiente ID
            const institutionName = courseData.institutionName;
            const institutionId = await fetchInstitutionName(institutionName);

            const response = await fetch(`http://localhost:3001/api/v1/courses/${selectedId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ course: { ...courseData, institution_id: institutionId } }),
            });

            if (response.ok) {
                alert('Curso actualizado exitosamente');
                navigate('/courses');
            } else {
                console.error('Error al actualizar el curso');
                setError('Error al actualizar el curso');
            }
        } catch (error) {
            console.error('Error de red:', error);
            setError('Error de red al actualizar el curso');
        }
    };

  // If data is still being loaded, show the Spinner
  if (loading) {
    return (
      <div>
        <Sidebar />
        <Spinner />
        <Footer />
      </div>
    );
  }

    return (
        <>
            <div className='main-container'>
                <Sidebar />
                <form onSubmit={handleSubmit}>
                    <h2 className='instrutions-tittle'>Actualiza tu curso</h2>
                    <div className='box-fromscourse'>
                        <div>
                            <div className='formcourses'>
                                <label className='instrutions' htmlFor="name">Edita tu nombre:</label>
                                <input className='datacourse' type="text" id="name" name="name" value={courseData.name} onChange={handleChange} />
                            </div>

                            <div className='formcourses'>
                                <label className='instrutions' htmlFor="description">Editar tu descripción:</label>
                                <input className='datacourse' type="text" id="description" name="description" value={courseData.description} onChange={handleChange} />
                            </div>

                            <div className='formcourses'>
                                <label className='instrutions' htmlFor="registration_day">Editar dia de matricula:</label>
                                <input className='datacourse' type="date" id="registration_day" name="registration_day" value={courseData.registration_day} onChange={handleChange} />
                            </div>

                            <div className='formcourses'>
                                <label className='instrutions' htmlFor="requirement">Editar requerimientos:</label>
                                <input className='datacourse' type="text" id="requirement" name="requirement" value={courseData.requirement} onChange={handleChange} />
                            </div>

                            <div className='formcourses'>
                                <label className='instrutions' htmlFor="institution">Edita tu isntitucion:</label>
                                <input className='datacourse' type="text" id="institution" name="institution" value={courseData.institutionName} onChange={handleChange} />
                            </div>

                            <button type="submit">Actualizar Curso</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CourseEdit;
