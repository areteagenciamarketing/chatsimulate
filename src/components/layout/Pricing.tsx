
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SlideUp, FadeIn, SequentialFadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PlanFeature {
  title: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PlanFeature[];
  buttonText: string;
  highlighted?: boolean;
}

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const plans: PricingPlan[] = [
    {
      name: "Básico",
      description: "Ideal para usuarios individuales que inician en X.",
      price: billingPeriod === "monthly" ? "€19" : "€190",
      period: billingPeriod === "monthly" ? "/mes" : "/año",
      features: [
        { title: "Hasta 2 cuentas de X", included: true },
        { title: "1 proxy personalizado", included: true },
        { title: "Scraping básico", included: true },
        { title: "Mensajes directos limitados", included: true },
        { title: "Respuestas automatizadas", included: true },
        { title: "Soporte por email", included: true },
        { title: "Integración con ChatBot", included: false },
        { title: "API avanzada", included: false },
      ],
      buttonText: "Comenzar gratis",
    },
    {
      name: "Profesional",
      description: "Perfecto para profesionales y pequeños equipos.",
      price: billingPeriod === "monthly" ? "€49" : "€490",
      period: billingPeriod === "monthly" ? "/mes" : "/año",
      features: [
        { title: "Hasta 10 cuentas de X", included: true },
        { title: "5 proxies personalizados", included: true },
        { title: "Scraping avanzado", included: true },
        { title: "Mensajes directos ilimitados", included: true },
        { title: "Respuestas inteligentes", included: true },
        { title: "Soporte prioritario", included: true },
        { title: "Integración con ChatBot", included: true },
        { title: "API básica", included: true },
      ],
      buttonText: "Suscribirme ahora",
      highlighted: true,
    },
    {
      name: "Empresarial",
      description: "Para agencias y grandes equipos con necesidades avanzadas.",
      price: billingPeriod === "monthly" ? "€99" : "€990",
      period: billingPeriod === "monthly" ? "/mes" : "/año",
      features: [
        { title: "Cuentas ilimitadas", included: true },
        { title: "Proxies ilimitados", included: true },
        { title: "Scraping ilimitado", included: true },
        { title: "Mensajes directos ilimitados", included: true },
        { title: "IA avanzada para respuestas", included: true },
        { title: "Soporte dedicado 24/7", included: true },
        { title: "Integración con ChatBot avanzada", included: true },
        { title: "API completa y personalizable", included: true },
      ],
      buttonText: "Contactar ventas",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-primary">
                Planes y precios
              </span>
            </div>
          </FadeIn>
          <SlideUp delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Elige el plan perfecto para tus necesidades
            </h2>
          </SlideUp>
          <SlideUp delay={200}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Ofrecemos planes flexibles diseñados para escalar contigo, desde usuarios individuales hasta grandes empresas.
            </p>
          </SlideUp>

          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center p-1 rounded-full bg-muted/30 border border-border">
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingPeriod === "monthly"
                    ? "bg-white shadow-sm text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setBillingPeriod("monthly")}
              >
                Mensual
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all relative",
                  billingPeriod === "annual"
                    ? "bg-white shadow-sm text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setBillingPeriod("annual")}
              >
                Anual
                <span className="absolute -top-6 right-0 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  20% descuento
                </span>
              </button>
            </div>
          </div>
        </div>

        <SequentialFadeIn
          className="grid md:grid-cols-3 gap-8"
          delay={100}
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "glass-card rounded-xl overflow-hidden hover-float transition-all duration-300",
                plan.highlighted &&
                  "ring-2 ring-primary/20 shadow-lg transform-gpu scale-105 md:scale-105"
              )}
            >
              {plan.highlighted && (
                <div className="bg-primary py-1.5 text-center">
                  <span className="text-sm font-medium text-white">
                    Más popular
                  </span>
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-muted-foreground mt-2 min-h-[50px]">
                  {plan.description}
                </p>
                <div className="mt-6 mb-8">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <Link to="/signup">
                  <Button
                    className={cn(
                      "w-full rounded-full",
                      plan.highlighted
                        ? "button-gradient"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="flex items-start text-sm"
                    >
                      <div
                        className={cn(
                          "mr-3 mt-0.5 flex-shrink-0",
                          feature.included
                            ? "text-primary"
                            : "text-muted-foreground/50"
                        )}
                      >
                        {feature.included ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={cn(
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        )}
                      >
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </SequentialFadeIn>
      </div>
    </section>
  );
};

export default Pricing;
