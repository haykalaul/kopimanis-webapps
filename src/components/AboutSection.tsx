import { Coffee, MapPin, Users, Award } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Coffee,
      title: "Biji Kopi Pilihan",
      description: "Menggunakan biji Arabica dan Robusta terbaik dari petani lokal",
    },
    {
      icon: MapPin,
      title: "Layanan Mobile",
      description: "Kami datang ke lokasi event, kantor, atau acara spesial Anda",
    },
    {
      icon: Users,
      title: "Barista Profesional",
      description: "Tim barista bersertifikat yang passionate dengan kopi",
    },
    {
      icon: Award,
      title: "Kualitas Terjamin",
      description: "Setiap sajian dibuat dengan standar tinggi dan konsisten",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tentang Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Membawa pengalaman kedai kopi premium langsung ke hadapan Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-4 p-6 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-latte p-12 rounded-2xl shadow-soft">
          <h3 className="text-2xl font-bold text-foreground">Cerita Kami</h3>
          <p className="text-muted-foreground leading-relaxed">
            Dimulai dari kecintaan kami pada kopi berkualitas, kami menciptakan layanan kopi keliling 
            yang menghadirkan pengalaman coffee shop premium ke berbagai lokasi. Dengan peralatan modern 
            dan barista berpengalaman, kami berkomitmen memberikan sajian kopi terbaik untuk setiap momen 
            spesial Anda.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Dari event korporat hingga gathering keluarga, kami siap melayani dengan profesional dan 
            penuh dedikasi untuk menciptakan pengalaman kopi yang tak terlupakan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
