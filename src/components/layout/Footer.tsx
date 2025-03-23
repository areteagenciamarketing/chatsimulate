
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Producto",
      links: [
        { name: "Características", href: "/#features" },
        { name: "Precios", href: "/#pricing" },
        { name: "Tutoriales", href: "#" },
        { name: "Actualizaciones", href: "#" },
      ],
    },
    {
      title: "Compañía",
      links: [
        { name: "Acerca de", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Equipo", href: "#" },
        { name: "Contacto", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Términos de servicio", href: "#" },
        { name: "Política de privacidad", href: "#" },
        { name: "Cookies", href: "#" },
      ],
    },
  ];

  return (
    <FadeIn>
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto py-16 px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white text-sm font-bold">X</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">XMaster</span>
              </Link>
              <p className="text-muted-foreground mt-4 max-w-md">
                La plataforma definitiva para gestionar tus interacciones en X. Automatización inteligente con un toque humano.
              </p>
              <div className="flex space-x-4 mt-6">
                {[
                  { name: "Twitter", icon: "X" },
                  { name: "LinkedIn", icon: "in" },
                  { name: "GitHub", icon: "GH" },
                  { name: "Instagram", icon: "IG" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <span className="text-xs">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-medium text-base mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} XMaster. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Términos
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacidad
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
};

export default Footer;
