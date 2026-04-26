import { FC } from 'react'
import styles from './Navigation.module.scss'
const Navigation: FC = () => {
	return <div className={styles.Navigation}>
    <Logo/>
    <MenuContainer/>
  </div>
}
export default Navigation
