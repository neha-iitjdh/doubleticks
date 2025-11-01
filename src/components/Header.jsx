import '../styles/header.css';
import logo from '../assets/logo.png';

// Header component with DoubleTick logo
export const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="DoubleTick" className="header__logo" />
    </header>
  );
};
