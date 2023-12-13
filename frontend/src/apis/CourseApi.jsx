const Course_url = 'http://localhost:3001/api/v1/courses';

async function getCourses() {
    try {
        const response = await fetch(Course_url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al obtener la lista de cursos.');
            return null;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return null;
    }
}

export { getCourses };
