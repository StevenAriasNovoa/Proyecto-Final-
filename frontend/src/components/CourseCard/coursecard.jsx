import React from "react";
import "./coursecard.css";
import Navbar from "../Navbar/navbar";

function CourseCard(props) {
  return (
    <header>
      <div>
    <Navbar>
    </Navbar>
    </div>
    <div className="boss">
      <div className="courses">
        <h1>Courses</h1>
        {props.courses &&
          props.courses.map((course) => (
            <div className="contenedor" key={course.id}>
              <section className="course-container">
                <div className="card">
                  {/* <div className="photo">
                    <img src={course.imageUrl} alt={course.name} />
                  </div> */}
                  <div className="content">
                    <div className="title">{course.name}</div>
                    <div className="bg-title"></div>
                    <div className="bg-title"></div>
                    <div className="feature color">
                      <div></div>
                      <span className="tt">blue</span>
                      <span className="ttt">green</span>
                    </div>
                    <button className="btn-buy">buy now</button>
                  </div>
                </div>
              </section>
            </div>
          ))}
      </div>
    </div>
  </header>
  );
}

export default CourseCard;
