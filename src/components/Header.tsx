import ClockWidget from "./ClockWidget"
import ToggleSwitch from "./ToggleSwitch"
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
];

export default function Header() {

    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
  
    const formatPageName = (path: string) => {
      return path
        .substring(path.lastIndexOf('/') + 1)
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  
    const currentPage = pathname ? formatPageName(pathname) : '';
    return (
      <header className="w-full fixed bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-10">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl py-8 mt-2">
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl font-bold text-left">{currentPage}</h1>
            <div className="flex items-center space-x-4">
              <ClockWidget />
              <ToggleSwitch isOn={theme === "dark"} handleToggle={toggleTheme} />
            </div>              
          </div>
          <nav className="flex justify-end space-x-4 py-4 me-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-md font-semibold leading-6 hover:text-gray-600">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    )
}