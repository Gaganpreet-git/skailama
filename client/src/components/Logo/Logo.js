import React from "react";
import LogoImage from "../../assets/images/logo.svg";
import styles from "./Logo.module.css";

const Logo = () => {
  return <img className={styles.logo} src={LogoImage} alt="Logo" />;
};

export default Logo;
