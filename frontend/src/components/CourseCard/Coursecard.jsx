import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// import HiddenText from "../../components/HiddenText/HiddenText.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx"
import "./Coursecard.css";

function CourseCard(props) {
  return (
    <div className="course-card-container">
      {props.courses && props.courses.length > 0 ? (
        props.courses.map((course) => (
          <Card key={course.id} className="text-center">
            <Card.Header>#{course.id}</Card.Header>
            <Card.Body>
              <Card.Title>{course.name}</Card.Title>
              <Card.Text>{course.description}</Card.Text>
              <button><Link to="/courseinfo">Ver información completa</Link></button>
              <button><Link to='/courseedit/'>Edit</Link></button>
            </Card.Body>
            <Card.Footer className="text-muted">{course.registration_day}</Card.Footer>
          </Card>
        ))
      ) : (
        <Spinner />
      )
      }
    </div >

  );
}

export default CourseCard;
