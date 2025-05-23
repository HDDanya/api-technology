// src/shared/ui/Navbar.tsx
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Главная', path: '/' },
  { name: 'Книги', path: '/books' },
  { name: 'Картинки', path: '/images' },
  { name: 'Карта', path: '/map' },
  { name: 'Текст', path: '/text' },
];

export const Navbar = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-blue-600">📚 MyApp</div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-500'
                  }`
                }>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
