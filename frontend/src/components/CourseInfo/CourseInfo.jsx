import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstitutionName } from '../../apis/InstitutionsApi.jsx';
import { fetchCourseAddresses } from '../../apis/AddressesApi.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import Sidebar from '../SideBard/Sidebard.jsx';
import Footer from '../Footer/Footer.jsx';
import "./CourseInfo.css"

const CourseInfo = () => {
  const { selectedId } = useParams();
  const [courseContent, setCourseContent] = useState({ course: {} });
  const [institutionName, setInstitutionName] = useState(null);
  const [addressesContent, setAddressesContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataShow = async () => {
      try {
        const url = `http://localhost:3001/api/v1/courses/${selectedId}`;
        const response = await fetch(url);
        const coursedata = await response.json();
        setCourseContent(coursedata);

        // Check if institution_id exists in the nested course property
        if (coursedata.course && coursedata.course.institution_id) {
          const institutionData = await fetchInstitutionName(coursedata.course.institution_id);
          setInstitutionName(institutionData.name);
        } else {
          console.log('No institution_id found in coursedata:', coursedata);
          setInstitutionName("Nombre no disponible");
        }

        const addressesData = await fetchCourseAddresses(selectedId);
        setAddressesContent(addressesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCourseContent([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataShow();
  }, [selectedId]);

  if (isLoading) { // Show spinner while data is being fetched
    return <div>
    <Sidebar />
      <Spinner />
    <Footer />
    </div>;
  }

  return (
    <>
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          <div className="boxcourse-info">
            <div className="info-container">
              <div key={courseContent?.course.id} className="text-center">
                <p>{courseContent?.course.id}</p>
                <h2>{courseContent?.course.name}</h2>
                <div>
                  <h2>{courseContent?.course.description}</h2>
                </div>
                <h2>{courseContent?.course.registration_day}</h2>
                <h2>{institutionName || 'Nombre no disponible'}</h2>
                <h2>Direcciones:</h2>
                <ul>
                  {addressesContent.map((address, index) => (
                    <li key={index}>
                      {`Dirección: ${[address.province, address.canton, address.distrito, address.neighborhood,address.zip_code].join(', ')}`}
                    </li>
                  ))}
                </ul>
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
