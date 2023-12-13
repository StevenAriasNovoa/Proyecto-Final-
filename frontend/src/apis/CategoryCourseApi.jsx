const CategoryCourse_url = 'http://localhost:3001/api/v1/category_courses';

async function getCategoryCourses() {
    try {
        const response = await fetch(CategoryCourse_url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al obtener la lista de categorías de cursos.');
            return null;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return null;
    }
}

export { getCategoryCourses };
