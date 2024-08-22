import { SlBasket } from 'react-icons/sl';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { SidebarLink } from '@components/Sidebar/SidebarLink';
import styles from '@/styles/Sidebar.module.css';
import logo from '@/assets/logo.svg';

export const Sidebar = () => {
  return (
      <div className={styles.sidebarBlock}>
        <img src={logo} alt='logo'/>
        <div className={styles.linksBlock}>
          <SidebarLink href='/orders' text='Orders' Icon={SlBasket}/>
          <SidebarLink href='/menu' text='Menu' Icon={HiOutlineClipboardList}/>
        </div>
      </div>
  );
};
