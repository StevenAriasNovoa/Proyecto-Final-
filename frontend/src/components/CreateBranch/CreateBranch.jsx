import React, { useState, useEffect } from 'react';
import { getCourses } from '../../apis/coursesApi';
import { getAddresses } from '../../apis/addressesApi';
import Sidebar from '../SideBard/Sidebard';
import Footer from '../Footer/Footer';

const CreateBranch = () => {
    const [name, setName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [courses, setCourses] = useState([]);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesData = await getCourses();
                setCourses(coursesData);
            } catch (error) {
                console.error('Error al obtener cursos:', error);
            } finally {
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesData = await getAddresses();
                setCourses(coursesData);
            } catch (error) {
                console.error('Error al obtener ubicaciones:', error);
            } finally {
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'courseName':
                setCourseName(value);
                break;
            case 'zip_code':
                setZipCode(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const selectedCourse = courses.find(course => course.name === courseName);
        const course_id = selectedCourse ? selectedCourse.id : null;

        const zipCodeAsNumber = Number(zipCode);
        const selectedLocation = addresses.find(address => address.zip_code === zipCodeAsNumber);
        const address_id = selectedLocation ? selectedLocation.id : null;

        if (!address_id) {
            setErrorMessages(['Ubicación no válida. Por favor, ingrese un código postal válido.']);
            return;
        }

        if (!course_id) {
            setErrorMessages(['Nombre de curso no válido. Por favor, elija un curso existente.']);
            return;
        }

        const branchData = {
            name,
            course_id,
            address_id,
        };

        try {
            const response = await fetch('http://localhost:3001/api/v1/branches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ branch: branchData }),
            });

            if (response.ok) {
                console.log('Branch creado exitosamente');
            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.log('Errores de validación:', errorData.error);
                    setErrorMessages(errorData.error);
                } else {
                    const errorText = await response.text();
                    console.error('Error al crear el branch. Detalles:', errorText);
                }
            }
        } catch (error) {
            console.error('Error de red:', error);
        }

        // Restaurar el estado después de enviar el formulario
        setName('');
        setCourseName('');
        setZipCode('');
    };

    return (
        <>
            <div className='main-container'>
                <Sidebar />
                <form onSubmit={handleSubmit}>
                    {errorMessages.length > 0 && (
                        <div style={{ color: 'red' }}>
                            <p>Error al crear el branch:</p>
                            <ul>
                                {errorMessages.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div>
                        <label htmlFor="name">Nombre del Branch:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="courseName">Nombre del Curso:</label>
                        <input
                            type="text"
                            id="courseName"
                            name="courseName"
                            value={courseName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="zip_code">Código Postal:</label>
                        <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            value={zipCode}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Crear Branch</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateBranch;