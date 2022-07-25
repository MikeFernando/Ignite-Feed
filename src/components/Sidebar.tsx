import { PencilLine } from 'phosphor-react';

import { Avatar } from './Avatar';

import coverImg from '../assets/capa-linkedin.jpg';

import styles from '../styles/Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
         <img className={styles.cover} src={coverImg} />
         
         <div className={styles.profile}>
            <Avatar 
               hasBorder
               src="https://github.com/MikeFernando.png"
               alt='Mike Fernando'
             />
            <strong>Mike Fernando</strong>
            <span>Web Developer</span>
         </div>

         <footer>
            <a href="#">
               <PencilLine size={20} />
               Editar seu perfil
            </a>
         </footer>
    </aside>
  )
}
