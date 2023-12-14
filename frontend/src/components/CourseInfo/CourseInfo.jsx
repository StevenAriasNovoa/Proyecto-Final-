import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstitutionName } from '../../apis/InstitutionsApi.jsx';
import { fetchCourseAddresses } from '../../apis/AddressesApi.jsx';
import { fetchCourseBranches } from '../../apis/BranchesApi.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import Sidebar from '../SideBard/Sidebard.jsx';
import Footer from '../Footer/Footer.jsx';
import "./CourseInfo.css"

const CourseInfo = () => {
  const { selectedId } = useParams();
  const [courseContent, setCourseContent] = useState({ course: {} });
  const [institutionName, setInstitutionName] = useState(null);
  const [addressesContent, setAddressesContent] = useState([]);
  const [branchesContent, setBranchesContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataShow = async () => {
      try {
        const url = `http://localhost:3001/api/v1/courses/${selectedId}`;
        const response = await fetch(url);
        const coursedata = await response.json();
        setCourseContent(coursedata);

        if (coursedata.course && coursedata.course.institution_id) {
          const institutionData = await fetchInstitutionName(coursedata.course.institution_id);
          setInstitutionName(institutionData.name);
        } else {
          setInstitutionName("Nombre no disponible");
        }

        // constante con los datos de la direccion del nombre de cada course , api mulada en branchApi.jsx
        const addressesData = await fetchCourseAddresses(selectedId);
        setAddressesContent(addressesData);

        // constante con los datos de la sucursal del nombre de cada course , api modulada en branchApi.jsx
        const branchesData = await fetchCourseBranches(selectedId);
        setBranchesContent(branchesData);

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
          <div key={courseContent?.course.id} className="text-center">
          <div className='flex'>
            <div id='boxid'>{courseContent?.course.id}</div>
            <h2 id='namecourse' >{courseContent?.course.name || "nombre de curso no disponible"}</h2>
          </div>
            <div className='course-information'>
              <h2>{courseContent?.course.description || "descripcion del curso no disponible"}</h2>
            </div>

            <p className='information'>Fecha de inscripcion {courseContent?.course.registration_day || "fecha no disponible"}</p>
            <p className='information'>Brindado por {institutionName || 'Nombre no disponible'}</p>
            <p className='information'>Brindado en la sucursal </p>
            <ul>
              {branchesContent.map((branch, index) => (
                <li key={index} className='branches-list'>
                  <p>{branch.name}</p>
                </li>
              ))}
            </ul>

            <h2>Direccion:</h2>
            <ul>
              {addressesContent.map((address, index) => (
                <li key={index} className='addresses-list'>
                  {`Dirección: ${[address.province, address.canton, address.district, address.neighborhood, address.zip_code].join(', ')}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseInfo;
