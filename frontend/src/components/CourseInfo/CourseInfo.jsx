import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstitutionName } from '../../apis/InstitutionsApi.jsx';
import { fetchCourseAddresses } from '../../apis/AddressesApi.jsx';
import { fetchCourseBranches } from '../../apis/BranchesApi.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import Sidebar from '../SideBard/Sidebard.jsx';
import Footer from '../Footer/Footer.jsx';
import "./CourseInfo.css"
import { getCourseForId } from '../../apis/CourseApi.jsx';

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
        // Get course information for the selected ID
        const coursedata = await getCourseForId(selectedId);
        setCourseContent(coursedata);

        // Get and set the institution name
        if (coursedata.course && coursedata.course.institution_id) {
          const institutionData = await fetchInstitutionName(coursedata.course.institution_id);
          setInstitutionName(institutionData.name);
        } else {
          setInstitutionName("Name not available");
        }

        // Get and set course addresses data
        const addressesData = await fetchCourseAddresses(selectedId);
        setAddressesContent(addressesData);

        // Get and set course branches data
        const branchesData = await fetchCourseBranches(selectedId);
        setBranchesContent(branchesData);

      } catch (error) {
        // Handle errors: log to console and set course content to empty
        console.error('Error fetching data:', error);
        setCourseContent([]);
      } finally {
        // Regardless of errors or not, set isLoading to false
        setIsLoading(false);
      }
    };

    fetchDataShow(); // Call the function to get data when the component mounts or selectedId changes
  }, [selectedId]);

  // If data is still being loaded, show the Spinner
  if (isLoading) {
    return (
      <div>
        <Sidebar />
        <Spinner />
        <Footer />
      </div>
    );
  }

  // Render the course content if not loading
  return (
    <>
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          {courseContent && courseContent.course && (
            <div key={courseContent.course.id} className="text-center">
              <div className='flex'>
                <div id='boxid'>{courseContent?.course.id}</div>
                <h2 id='namecourse' >{courseContent?.course.name || "Name of course not available"}</h2>
              </div>
              <div className='course-information'>
                <h2>{courseContent?.course.description || "Course description not available"}</h2>
              </div>

              <p className='information'>Registration date {courseContent?.course.registration_day || "Date not available"}</p>
              <p className='information'>Provided by {institutionName || 'Name not available'}</p>

              {branchesContent.map((branch, index) => (
                <p key={index} className='branches-list'>
                  <p className='information'>at branch: {branch.name}</p>
                </p>
              ))}

              <ul>
                {addressesContent.map((address, index) => (
                  <li key={index} className='addresses-list'>
                    {`Address: ${[address.province, address.canton, address.district, address.neighborhood, address.zip_code].join(', ')}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseInfo;
