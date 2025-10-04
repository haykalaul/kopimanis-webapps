import { Card, CardContent } from "@/components/ui/card";
import coffeeDrinks from "@/assets/coffee-drinks.jpg";

const MenuSection = () => {
  const menuItems = [
    {
      name: "Espresso",
      price: "Rp 15.000",
      description: "Shot tunggal espresso murni dari biji Arabica pilihan",
    },
    {
      name: "Kopi Susu Premium",
      price: "Rp 18.000",
      description: "Perpaduan sempurna espresso dengan susu segar",
    },
    {
      name: "Latte",
      price: "Rp 20.000",
      description: "Espresso dengan susu steamed dan foam halus",
    },
    {
      name: "Cappuccino",
      price: "Rp 20.000",
      description: "Kombinasi seimbang espresso, susu, dan foam",
    },
    {
      name: "Caramel Macchiato",
      price: "Rp 25.000",
      description: "Latte manis dengan saus caramel premium",
    },
    {
      name: "Cold Brew",
      price: "Rp 22.000",
      description: "Kopi dingin diseduh 12 jam untuk rasa smooth",
    },
  ];

  return (
    <section id="menu" className="py-24 bg-gradient-latte">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Menu Pilihan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Setiap cangkir dibuat dengan penuh perhatian menggunakan biji kopi terbaik
          </p>
        </div>

        {/* Featured Image */}
        <div className="max-w-3xl mx-auto mb-16">
          <img
            src={coffeeDrinks}
            alt="Premium Coffee Selection"
            className="w-full h-auto rounded-2xl shadow-warm"
          />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className="hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                  <span className="text-lg font-semibold text-accent">{item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
