
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn, SlideDown } from "@/components/ui/motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Características", path: "/#features" },
    { name: "Precios", path: "/#pricing" },
    { name: "Panel", path: "/dashboard" },
  ];

  return (
    <SlideDown className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={cn(
          "py-4 px-6 md:px-10 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white text-xl font-bold">X</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">XMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-sm transition-colors duration-200 hover:text-primary",
                    location.pathname === item.path
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="rounded-full px-5">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="rounded-full px-5 button-gradient">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 transition-all duration-300 glass-panel mt-2 mx-4 overflow-hidden",
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="py-4 px-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block py-2 transition-colors duration-200 hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              <Link to="/login">
                <Button variant="outline" className="w-full rounded-full">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full rounded-full button-gradient">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </SlideDown>
  );
};

export default Navbar;
