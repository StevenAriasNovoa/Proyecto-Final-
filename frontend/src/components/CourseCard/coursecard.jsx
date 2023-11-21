import React from "react";
import "./coursecard.css";


interface Cardsprops {
  id: number;
  name: string;
  description: string;
  registration_day: string;
  requirement: string;
  clickParaDetalles: (id: number | string) => void
}


function CourseCard(props: Cardsprops) {  
  return (
    <div className="boss">
    <div className="courses">
      <h1>Courses</h1>
      {props.courses &&
        props.courses.map((course) => (
          <div className="contenedor" key={course.id}>
            <section className="product-container product-1">
              <div className="card">
                <div className="photo"></div>
                <div className="content">
                  <div className="title">{course.name}</div>
                  <div className="bg-title">intitution</div>
                  <div className="feature color">
                    <div>color :</div>
                    <span>pink</span>
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
  );
}

export default CourseCard;