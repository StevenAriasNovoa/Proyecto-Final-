import React from "react";
import { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/SideBard/Sidebard.jsx";
import CourseEdit from "../CourseEdit/CourseEdit.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import { getCourses } from '../../apis/coursesApi.jsx';
import { getCategoryCourses } from '../../apis/CategoryCourseApi.jsx';
import "./Course.css";

const Course = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoryCourse, setCategoryCourse] = useState([]);

  const handleCourseClick = (id) => {
    setSelectedId(id);
  };

  const handleCloseEditForm = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategoryCourse = async () => {
      try {
        const categoryCourseData = await getCategoryCourses();
        setCategoryCourse(categoryCourseData);
      } catch (error) {
        console.error('Error al obtener las categorías en category_course:', error);
      }
    };

    fetchCategoryCourse();
  }, []);

  const normalizedText = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //descomponer los caracterers diacríricos Eliminar caracteres diacríticos
  };


  const onSearch = () => {
    setLoading(true);
    const searchTerm = searchCourse.toLowerCase().trim();

    if (searchTerm === '') {
      setSearchResults(courses);
    } else {
      const filteredCourses = courses.filter(course => {
        const termName = normalizedText(course.name).toLowerCase().includes(searchTerm);

        const termDescription = normalizedText(course.description).toLowerCase().includes(searchTerm);

        return termName || termDescription;
      });
      setSearchResults(filteredCourses);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchCourse.trim() === '') {
      setSearchResults([]);
    } else {
      onSearch();
    }
  }, [searchCourse, courses]);


  return (
    <>
      <div className="boss">
        <Navbar onSearch={(term) => setSearchCourse(term)} />
        <div className="course-container">
          <Sidebar className="barra" />
          <div className="main-content">
            <div className="course-cards-container">
            <ul>
                    {categoryCourse.map((category, index) => (
                      <li key={index}>{category.name}</li>
                    ))}
                  </ul>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <div className="boxresults">
                    <CourseCard courses={searchResults} onCourseClick={handleCourseClick} />
                  </div>
                  <CourseCard courses={courses} onCourseClick={handleCourseClick} />
                </>
              )}
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
};



export default Course;