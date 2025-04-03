import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { MENU_DATA } from '@/common/constants/layout/MenuData';

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
  isLabel?: boolean;
}

const MENU: IMenuItem[] = MENU_DATA;

const MenuSidebar = ({ collapsed }: { collapsed: boolean }) => {
  const [selectedPath, setSelectedPath] = useState<string>('');

  const handleMenuItemClick = (path?: string) => {
    setSelectedPath(path || '');
  };

  const renderedMenu = useMemo(
    () =>
      MENU.map((menuItem) => {
        if (menuItem.isLabel) {
          return collapsed ? (
            <div
              key={menuItem.name}
              className="divider before:bg-slate-300 after:bg-slate-300"
            />
          ) : (
            <li
              key={menuItem.name}
              className="text-sm text-slate-300 uppercase my-2 ml-2"
            >
              {menuItem.name}
            </li>
          );
        }

        return (
          <li
            key={menuItem.name}
            className={clsx(collapsed && 'flex justify-center')}
          >
            <Link
              onClick={() => handleMenuItemClick(menuItem.path)}
              to={menuItem.path || ''}
              className={clsx(
                'block py-2 rounded hover:bg-accent/70 px-4',
                selectedPath === menuItem.path && 'bg-primary hover:bg-primary'
              )}
              title={menuItem.name}
              aria-label={menuItem.name}
            >
              {menuItem.icon && (
                <i className={clsx(menuItem.icon, !collapsed && 'mr-2')} />
              )}
              {!collapsed && menuItem.name}
            </Link>
          </li>
        );
      }),
    [collapsed, selectedPath]
  );

  return (
    <aside
      className={clsx(
        'main-sidebar bg-neutral text-gray-300 transition-all duration-300 ease-in-out',
        collapsed ? 'w-16 overflow-hidden' : 'w-[250px]'
      )}
    >
      {/* Logo section, fixed at the top */}
      <div className="flex-shrink-0 h-14 bg-neutral flex items-center gap-x-2 px-4">
        <Link to="/" className="flex items-center gap-x-2">
          <img
            src="/LogoTempFire.png"
            alt="Solaris Logo"
            className="rounded-full h-9 opacity-80 shadow-md"
          />
          <span className={clsx('text-white', collapsed && 'hidden')}>
            Tuile
          </span>
        </Link>
      </div>

      {/* Scrollable menu content */}
      <div
        className={clsx(
          'sidebar-content overflow-y-auto max-h-screen',
          collapsed && 'no-scrollbar'
        )}
      >
        <div className="px-2 pt-4 border-t border-sidebar border-gray-600 mb-10">
          <div className="relative">
            {!collapsed && (
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full px-3 py-2 mb-0 text-sm text-neutral bg-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
          <nav>
            <ul className={clsx('space-y-1 m-1')}>
              {renderedMenu}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default MenuSidebar;
