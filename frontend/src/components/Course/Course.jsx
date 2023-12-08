import { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/SideBard/Sidebard.jsx";
import CourseEdit from "../CourseEdit/CourseEdit.jsx";
import "./Course.css";


const Course = ({ searchCourse }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [courses, setCourses] = useState([]);
  const Course_url = 'http://localhost:3001/api/v1/courses';

  const handleCourseClick = (id) => {
    setSelectedId(id);
  };

  const handleCloseEditForm = () => {
    setSelectedId(null);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(Course_url);
      const json = await response.json();
      setCourses(json);
    } catch (error) {
    }
  };

  const onSearch = async () => {
    const response = await fetch(`${Course_url}?name=${searchCourse}`);
    const json = await response.json();
    setCourses(json);
  }

  useEffect(() => {
    fetchData(); // Llamar a la carga inicial de cursos al cargar el componente
  }, []);

  return (
    <>
      <div className="boss">
        <Navbar />
        <div className="course-container">
          <Sidebar className="barra" />
          <div className="main-content">
            <div className="course-cards-container">
              {searchCourse && <h2> Tu busqueda: "{searchCourse}"</h2>}
              <CourseCard courses={courses} onCourseClick={handleCourseClick} />
              <div>
                {selectedId && (
                  <CourseEdit courseId={selectedId} onClose={handleCloseEditForm} />
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Course;
