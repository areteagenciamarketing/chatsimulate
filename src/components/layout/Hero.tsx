
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp, Float } from "@/components/ui/motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 md:px-0">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-8 text-center md:text-left">
          <FadeIn>
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-primary">
                Plataforma de automatización para X
              </span>
            </div>
          </FadeIn>

          <SlideUp delay={100}>
            <h1 className="font-bold tracking-tight">
              Interacción humana <br />
              <span className="text-primary">automatizada</span> en X
            </h1>
          </SlideUp>

          <SlideUp delay={200}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto md:mx-0">
              Simula interacciones humanas en X, gestiona múltiples cuentas con
              proxies individuales y automatiza tu estrategia de comunicación.
            </p>
          </SlideUp>

          <SlideUp delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 button-gradient h-12">
                  Comenzar gratis
                </Button>
              </Link>
              <Link to="#demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-12 border-primary/20"
                >
                  Ver demo
                </Button>
              </Link>
            </div>
          </SlideUp>

          <SlideUp delay={400}>
            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Plataforma de confianza utilizada por:
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
                {["Brand A", "Brand B", "Brand C", "Brand D"].map((brand, index) => (
                  <div
                    key={brand}
                    className="text-muted-foreground/60 text-sm font-medium"
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </SlideUp>
        </div>

        <Float className="hidden md:block">
          <div className="glass-panel p-3 rounded-2xl shadow-xl">
            <div className="bg-background rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="px-3 py-1 rounded-full bg-muted/50 text-xs">
                  XMaster
                </div>
                <div className="w-10"></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-5 w-1/3 bg-muted rounded-full" />
                  <div className="h-5 w-2/3 bg-muted rounded-full" />
                </div>
                <div className="glass-card p-4 rounded-lg space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10" />
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-muted/60 rounded-full" />
                      <div className="h-2 w-16 bg-muted/40 rounded-full" />
                    </div>
                  </div>
                  <div className="h-12 bg-muted/30 rounded-lg" />
                  <div className="flex justify-end">
                    <div className="h-6 w-16 bg-primary/20 rounded-full" />
                  </div>
                </div>
                <div className="glass-card p-4 rounded-lg space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10" />
                    <div className="space-y-1">
                      <div className="h-3 w-20 bg-muted/60 rounded-full" />
                      <div className="h-2 w-14 bg-muted/40 rounded-full" />
                    </div>
                  </div>
                  <div className="h-10 bg-muted/30 rounded-lg" />
                  <div className="flex justify-end">
                    <div className="h-6 w-16 bg-primary/20 rounded-full" />
                  </div>
                </div>
                <div className="h-8 w-full bg-primary/20 rounded-full" />
              </div>
            </div>
          </div>
        </Float>
      </div>
    </div>
  );
};

export default Hero;
