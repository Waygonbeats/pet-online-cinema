import React, { FC } from 'react'
import styles from './Layout.module.scss'
import { Navigation } from './Navigation/Navigation'
import { Sidebar } from './Sidebar/Sidebar'
export const Layout:FC = ({}) => {
  return (
    <div className="background-white">
  <Navigation/>
  <div > </div>
  <div className={styles.center}>{}</div>
  <Sidebar/>
  </div>
  )
}
