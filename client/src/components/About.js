import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>
        This is MERN stack application called Task Tracker that allows the user
        to create tasks and set Day & time also Reminder. The main goal of this
        application is to try how to dockerize mern apps using Docker.
      </h4>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default About;
