import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021 Ayman Butmah & Razan Qazaha</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
