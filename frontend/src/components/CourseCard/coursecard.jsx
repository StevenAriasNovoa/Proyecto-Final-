import React from "react";
import "./coursecard.css";

function CourseCard(props) {
  return (
    <section className="courses body4 product-container product-1">
      {props.courses &&
        props.courses.map((course) => (
          <div className="card" key={course.id}>
            <div className="photo"></div>
            <div className="content">
              <div className="title">
                {course.name}
              </div>
              <div className="bg-title">
              algo
              </div>
              <div className="feature size">
                <div>size :</div>
                <span>S</span>
                <span>M</span>
                <span>L</span>
              </div>
              <div className="feature color">
                <div>color :</div>
                <span>pink</span>
                <span className="tt">blue</span>
                <span className="ttt">green</span>
              </div>
              <button className="btn-buy">buy now</button>
            </div>
          </div>
        ))}
    </section>
  );
}

export default CourseCard;
