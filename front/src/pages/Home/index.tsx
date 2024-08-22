import { useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/store';
import { toggleTab } from '@store/reducers/authReducer';
import { getActiveTab } from '@store/selectors';
import { Sidebar } from '@components/Sidebar/Sidebar';
import { OrdersPage } from '@pages/Orders';
import { MenuPage } from '@pages/Menu';
import { Tabs } from '@/interfaces';
import styles from '@/styles/Home.module.css';

export const Home = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(getActiveTab);

  useEffect(() => {
    dispatch(toggleTab(pathname as Tabs));
  }, [pathname]);

  useEffect(() => {
    sessionStorage.setItem('currentRoute', pathname);
  }, [pathname]);

  return (
      <div className={styles.homeBlock}>
        <Sidebar/>
        {activeTab === Tabs.ORDERS && <OrdersPage/>}
        {activeTab === Tabs.MENU && <MenuPage/>}
      </div>
  );
};
