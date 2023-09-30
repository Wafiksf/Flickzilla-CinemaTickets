import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Icons from '../icons/icons';
import "./Header.css";
import "./Header.scss";
import SearchModal from "../serachModal";
import Logo from "../../images/flicklogo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Search from "../search"
import { Link } from "react-router-dom";
import { isAdminUser } from '../../utils/authUtils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY >= 5) {
        navbar.style.backgroundColor = "#000";
      } else {
        navbar.style.backgroundColor = "transparent";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
  };
  const token = localStorage.getItem('token');
  const isAdmin = isAdminUser(token);

  return (
    <>
      <header className="navbar">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
            <div className="md:text-xl lg:text-2xl xl:text-3xl">
            <img src={Logo} alt="flick" width="150px"/>
        </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 effect-links">
            <Link 
              to="/AllMovies"
              className="text-md leading-6 text-white font-normal"
              onClick={scrollToTop}
            >
              Movies
            </Link>
            <Link
              to="/Upcoming"
              className="text-md leading-6 text-white font-normal"
              onClick={scrollToTop}
            >
              Upcoming
            </Link>
            <Link
              to="/about"
              className="text-md leading-6 text-white font-normal"
              onClick={scrollToTop}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-md leading-6 text-white font-normal"
              onClick={scrollToTop}
            >
              Contact
            </Link>
            <Link
              to="/menu"
              className="text-md leading-6 text-white font-normal"
              onClick={scrollToTop}
            >
              Menu
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAdmin && ( // Render only if the user is an admin
            <Link to="/dash">
              <Icons.SpaceDashboard
                size={30}
                className="text-white mr-5 hover:text-pink transition-colors duration-300 cursor-pointer"
              />
            </Link>
          )}
          {token && (
            <Link to="/bookedMovies"><Icons.Ticket2
              size={30}
              className="text-white mr-5 hover:text-pink transition-colors duration-300 cursor-pointer"
            /></Link>
          )}
            <Icons.Search
              onClick={handleSearchClick}
              size={30}
              className="text-white mr-5 hover:text-pink transition-colors duration-300 cursor-pointer"
            />
            <Link to="/login"><Icons.User
              size={30}
              className="text-white hover:text-pink transition-colors duration-300 cursor-pointer"
            /></Link>
            {isSearchModalOpen && (
              <SearchModal
                isOpen={isSearchModalOpen}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-pink">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
              <div className="md:text-xl lg:text-2xl xl:text-3xl">
            <img src={Logo} alt="flick" width="150px"/>
        </div>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-pink"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-pink">
                <div className="space-y-2 py-6">
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/allMovies"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-white/10"
                  >
                    Movies
                  </Link>
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/upcoming"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-pink hover:bg-white/10"
                  >
                    Upcoming
                  </Link>
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-pink hover:bg-white/10"
                  >
                    About
                  </Link>
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-pink hover:bg-white/10"
                  >
                    Contact
                  </Link>
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/menu"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-pink hover:bg-white/10"
                  >
                    Menu
                  </Link>
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/bookedMovies"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-pink hover:bg-white/10"
                  >
                    My Tickets
                  </Link>
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-pink hover:bg-white/10"
                  >
                    My Account
                  </Link>
                  {isAdmin && ( // Render only if the user is an admin
                  <Link
                  onClick={() => setMobileMenuOpen(false)}
                    to="/dash"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-pink hover:bg-white/10"
                  >
                    Dashboard
                  </Link>
                            )}
                </div>
                <div className="py-6">
                  <div className="w-full px-4 py-2">
                    <Search/>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <Outlet />
    </>
  );
}
