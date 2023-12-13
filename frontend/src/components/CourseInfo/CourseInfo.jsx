import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstitutionName } from '../../apis/InstitutionsApi.jsx';
import Card from "react-bootstrap/Card";
import Spinner from '../Spinner/Spinner.jsx';
import Sidebar from '../SideBard/Sidebard.jsx';
import Footer from '../Footer/Footer.jsx';
import "./CourseInfo.css"

const CourseInfo = () => {
  const { selectedId } = useParams();
  const [courseContent, setCourseContent] = useState(null);
  const [institutionName, setInstitutionName] = useState(null);

  useEffect(() => {
    const fetchDataShow = async () => {
      try {
        const url = `http://localhost:3001/api/v1/courses/${selectedId}`;
        const response = await fetch(url);
        const coursedata = await response.json();
        setCourseContent(coursedata);

        const institutionData = await fetchInstitutionName(coursedata.institution_id);
        setInstitutionName(institutionData.name);
      } catch (error) {
        console.error('error al obtener data:', error);
        setCourseContent([]);
      }
    };

    fetchDataShow();
  }, [selectedId]);

  if (!courseContent) { // no contenido, hay spinner
    return <div>
      <Spinner />
    </div>;
  }

  return (
    <>
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          <div className="boxcourse-info">
            <div className="info-container">
              <div key={courseContent.id} className="text-center">
                <Card>
                  <p>{courseContent.id}</p>
                  <h2>{courseContent.name}</h2>
                  <div>
                    <h2>{courseContent.description}</h2>
                  </div>
                  <h2>{courseContent.registration_day}</h2>
                  <h2>{institutionName || 'Nombre no disponible'}</h2>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseInfo;
