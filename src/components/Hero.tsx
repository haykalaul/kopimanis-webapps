import { Button } from "@/components/ui/button";
import { Coffee, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-coffee.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Mobile Coffee Business"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm text-sm font-medium text-secondary-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>Kopi Berkualitas, Dimana Saja</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            KOPI KELILING
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Sajian kopi premium langsung di lokasi Anda. Nikmati cita rasa terbaik dari biji pilihan, 
            diseduh dengan sempurna oleh barista profesional kami.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-coffee text-primary-foreground hover:opacity-90 shadow-warm text-lg px-8"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Coffee className="mr-2 h-5 w-5" />
              Lihat Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 border-2 hover:bg-secondary"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Tentang Kami
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full p-1">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
