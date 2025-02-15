import React from 'react'
import styles from './Header.module.css'
import Logo from '../../components/Logo/Logo'
import Navigation from '../../components/Navigation/Navigation'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo/></div>
        <Navigation/>
    </header>
  )
}

export default Header