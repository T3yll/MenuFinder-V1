import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuSidebar from '../components/layout/MenuSidebar';
import Header from '../components/layout/Header';

const Main = () => {
  const [menuSidebarCollapsed, setMenuSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <MenuSidebar collapsed={menuSidebarCollapsed} />
      <div className="flex flex-col flex-1">
        <Header
          isSidebarOpen={menuSidebarCollapsed}
          setIsSidebarOpen={setMenuSidebarCollapsed}
        />
        <div className="content-wrapper flex-1 overflow-y-auto">
          <div className="pt-3" />
          <section className="content">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;
