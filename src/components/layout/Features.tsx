
import { FadeIn, SlideUp, SequentialFadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const Feature = ({ title, description, icon, className }: FeatureProps) => (
  <div className={cn("glass-card p-6 rounded-xl hover-float", className)}>
    <div className="flex flex-col space-y-3">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-medium mt-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Features = () => {
  const features = [
    {
      title: "Simulación de interacción humana",
      description: "Realiza interacciones naturales que simulan el comportamiento humano a través del navegador.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <circle cx="9" cy="9" r=".5" fill="currentColor"></circle>
          <circle cx="15" cy="9" r=".5" fill="currentColor"></circle>
        </svg>
      ),
    },
    {
      title: "Gestión de múltiples cuentas",
      description: "Conecta y gestiona numerosas cuentas de X desde una única plataforma centralizada.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Conexión proxy personalizada",
      description: "Asigna un proxy diferente a cada cuenta para mayor seguridad y evitar bloqueos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
    },
    {
      title: "Integración con ChatBot",
      description: "Conecta con APIs de chatbots para generar respuestas inteligentes y personalizadas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      title: "Scraping de publicaciones",
      description: "Extrae las publicaciones más recientes de cuentas seleccionadas para interactuar con ellas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      ),
    },
    {
      title: "Automatización de comentarios",
      description: "Genera y publica comentarios inteligentes en las publicaciones escogidas automáticamente.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-primary">
                Características principales
              </span>
            </div>
          </FadeIn>
          <SlideUp delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Una plataforma completa para automatizar <br className="hidden md:block" />
              tus interacciones en X
            </h2>
          </SlideUp>
          <SlideUp delay={200}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Todas las herramientas que necesitas para gestionar tus estrategias de comunicación
              y crecimiento en X de forma eficiente y natural.
            </p>
          </SlideUp>
        </div>

        <SequentialFadeIn
          delay={50}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </SequentialFadeIn>
      </div>
    </section>
  );
};

export default Features;
