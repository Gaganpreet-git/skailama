import React from 'react'
import styles from './HeaderWrapper.module.css'
import Header from '../../ui/Header/Header'

const HeaderWrapper = ({children}) => {
  return (
    <div className={styles.headerWrapper}>
        <Header/>
        {children}
    </div>
  )
}

export default HeaderWrapper