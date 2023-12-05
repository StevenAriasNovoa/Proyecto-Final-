import React from 'react';

const CourseInfo = (props) => {
  return (
    <div className="course-card-container">
      {props.courses && props.courses.length > 0 ? (
        props.courses.map((course) => (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <p>ID: {course.id}</p>
          </div>
        ))
      ) : (
        <p>No hay cursos disponibles.</p>
      )}
    </div>
  );
};

export default CourseInfo;