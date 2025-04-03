import ThemeHandler from '@/common/components/layout/ThemeHandler';
import MenuProfile from '@/common/components/layout/MenuProfile';

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  const handleToggleMenuSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-neutral text-white px-4 h-14">
      <ul className="navbar-nav flex items-center">
        <li className="nav-item">
          <button
            onClick={handleToggleMenuSidebar}
            type="button"
            className="nav-link text-white focus:outline-none mr-4"
          >
            <i className="fas fa-bars"></i>
          </button>
        </li>
      </ul>
      <div className="flex items-center gap-8">
        <MenuProfile />
        <ThemeHandler />
      </div>
    </nav>
  );
};

export default Header;
