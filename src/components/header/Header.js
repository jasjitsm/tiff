import React from 'react';
import './Header.scss';
import logo from './../../assets/images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="TIFF Logo"/>
    </header>
  );
}

export default Header;

