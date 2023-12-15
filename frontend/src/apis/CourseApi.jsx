const Course_Url = 'http://localhost:3001/api/v1/courses';

async function getCourses(page) {
    try {
        const response = await fetch(`${Course_Url}?page=${page}`);
        //agrega el parametro de la pagina de la lista de cursos
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

 const getCourseForId = async (courseId) => {
    try {
      const url = `${Course_Url}/${courseId}`;
      const response = await fetch(url);
      const courseData = await response.json();
      return courseData;
    } catch (error) {
      console.error('Error fetching course data:', error);
      throw error; 
    }
  };
  

export { getCourses, getCourseForId };
