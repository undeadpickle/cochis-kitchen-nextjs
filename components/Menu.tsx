import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { cn } from "@/lib/utils";
import {
  Coffee,
  Sandwich,
  Soup,
  Croissant,
  ChefHat,
  Menu as MenuIcon,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryDropdown, {
  Category,
} from "@/components/common/CategoryDropdown";
import ImagePopup from "@/components/common/ImagePopup";
import type { PageQuery } from "../../tina/__generated__/types";

// Define proper type for menu items
interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
}

interface MenuCategory extends Category {
  items: MenuItem[];
}

/**
 * Type for the props expected by Menu
 */
interface MenuProps {
  content: PageQuery["page"];
}

// Menu data with images
const menuCategories: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    icon: Coffee,
    items: [
      {
        name: "Breakfast Burrito",
        description:
          "Roasted red potatoes, scrambled eggs, Swiss American cheese, and choice of protein.",
        price: "$12.25",
        image: "/images/menu/menu-breakfast-burrito.png",
      },
      {
        name: "Bialy Sando",
        description:
          "Choice of house-made bialy, 2 fried eggs, American cheese, and choice of protein.",
        price: "$11.25",
        image: "/images/menu/menu-breakfast-bialy.png",
      },
      {
        name: "Breakfast Tacos",
        description:
          '2-6" flour tortillas, scrambled eggs, cheddar cheese, pico de gallo, avocado, chipotle crema and choice of protein.',
        price: "$12.50",
        image: "/images/menu/menu-breakfast-tacos.png",
      },
      {
        name: "Breakfast Bowl",
        description:
          "Roasted red potatoes, scrambled eggs, pico de gallo, cheddar cheese, avocado, and choice of protein.",
        price: "$12.50",
        image: "/images/menu/menu-breakfast-bowl.png",
      },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    icon: Sandwich,
    items: [
      {
        name: "Guido",
        description:
          "Hot Copa, Mortadella, hard salami, provolone, pepperoncini & house Italian dressing on a sweet roll.",
        price: "$17.50",
        featured: true,
        image: "/images/menu/menu-guido-sandwich.png",
      },
      {
        name: "The Basic B",
        description:
          "Smoked turkey, avocado, imported Swiss cheese on Dutch crunch.",
        price: "$17.25",
        image: "/images/menu/menu-basicb-sandwich.png",
      },
      {
        name: "Garden Gobbler",
        description:
          "Double-cream cheese, tomato, cucumber, avocado, pepperoncini, black olives, artichoke hearts, garlic sauce on a spinach wrap.",
        price: "$15.50",
        image: "/images/menu/menu-gardengobbler.png",
      },
      {
        name: "The Godfather",
        description:
          "Basil pesto, sundried tomato pesto, parma prosciutto, mortadella, hard salami, pepperoni, roasted piquillo peppers, balsamic olive oil glaze and mozzarella on house focaccia.",
        price: "$19.00",
        image: "/images/menu/menu-godfather.png",
      },
    ],
  },
  {
    id: "salads",
    name: "Salads",
    icon: Soup,
    items: [
      {
        name: "Fiesta Salad",
        description:
          "Romaine, chicken breast, pico de gallo, black beans, cheddar cheese, avocado and tortilla strips served with your choice of salad dressing.",
        price: "$17.00",
        image: "/images/menu/menu-fiesta-salad.png",
      },
      {
        name: "Chopped Italian",
        description:
          "Salami, artichoke hearts, sundried tomatoes, pepperoncini, parmesan cheese with an Italian dressing.",
        price: "$16.00",
        image: "/images/menu/menu-italian-salad.png",
      },
      {
        name: "Cochi Cobb",
        description:
          "Romaine, sliced chicken breast, blue cheese, hardboiled egg, marinated tomatoes, chicken breast, avocado & crispy onions.",
        price: "$17.00",
        image: "/images/menu/menu-cobb-salad.png",
      },
    ],
  },
  {
    id: "bakery",
    name: "Bakery",
    icon: Croissant,
    items: [
      {
        name: "Scones",
        description: "House-made daily. Ask about our current flavors.",
        price: "$4.75",
        image: "/images/menu/menu-scones.png",
      },
      {
        name: "Cookies",
        description:
          "Freshly baked chocolate chip, oatmeal raisin, or sugar cookies.",
        price: "$3.50",
        image: "/images/menu/menu-cookies.png",
      },
      {
        name: "House-made Focaccia",
        description: "Our signature herb-infused focaccia bread.",
        price: "$6.50",
        image: "/images/menu/menu-focaccia.png",
      },
    ],
  },
  {
    id: "specials",
    name: "Monthly Specials",
    icon: ChefHat,
    items: [
      {
        name: "Nashville Fried Chicken",
        description:
          "Our famous Nashville-style hot fried chicken sandwich with house pickles and slaw.",
        price: "$18.50",
        featured: true,
        image: "/images/menu/menu-fried-chicken-sandwich.png",
      },
      {
        name: "Tri-tip Sandwich",
        description:
          "House-smoked tri-tip with caramelized onions and horseradish aioli on a freshly baked roll.",
        price: "$19.00",
        featured: true,
        image: "/images/menu/menu-tritip-sandwich.png",
      },
    ],
  },
];

const Menu: React.FC<MenuProps> = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const selectedCategory =
    menuCategories.find((cat) => cat.id === activeCategory) ||
    menuCategories[0];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const closeItemPopup = () => {
    setSelectedItem(null);
  };

  // MenuCard component with click handler
  const MenuCard = ({ item }: { item: MenuItem }) => (
    <div
      className={cn(
        "overflow-hidden rounded-lg transition-all duration-300 h-full flex flex-col aspect-square bg-white shadow-sm cursor-pointer",
        item.featured
          ? "border-2 border-cochi-gold/30"
          : "border border-cochi-cream-darker",
        "hover:shadow-lg hover:-translate-y-1"
      )}
      onClick={() => handleItemClick(item)}
    >
      <div className="w-full h-60 relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 hover:scale-105"
        />
        {item.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-cochi-red text-white rounded-full shadow-sm flex items-center">
            <span className="mr-1">★</span> House Favorite
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-cochi-brown">
              {item.name}
            </h3>
            <span className="text-lg font-bold text-cochi-red ml-2">
              {item.price}
            </span>
          </div>
          <p className="text-cochi-brown/80 text-sm line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );

  // Check if content is loaded
  if (!content) {
    return null; // Or a loading placeholder
  }

  return (
    <section id="menu" className="py-16 bg-cochi-cream">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={content.menuHighlightsTitle || "Menu Highlights"}
          subtitle={content.offeringsTitle || "Our Offerings"}
          align="center"
          className="mb-8 md:mb-12"
        />

        <div className="mb-8 md:mb-10">
          {isMobile ? (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between items-center text-lg py-6 border-cochi-brown/30 bg-white hover:bg-cochi-cream"
                >
                  <span>
                    {selectedCategory.icon && (
                      <selectedCategory.icon className="inline-block mr-2 h-5 w-5 align-middle" />
                    )}
                    {selectedCategory.name}
                  </span>
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-0 h-[60vh] rounded-t-lg">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-center text-cochi-brown">
                      Select a Category
                    </h3>
                    {menuCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          activeCategory === category.id ? "secondary" : "ghost"
                        }
                        onClick={() => handleCategoryChange(category.id)}
                        className="w-full justify-start items-center text-lg py-6 mb-2"
                      >
                        {category.icon && (
                          <category.icon className="inline-block mr-3 h-5 w-5 align-middle" />
                        )}
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          ) : (
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5 bg-cochi-cream-darker/60 h-auto p-2 rounded-lg">
                {menuCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-cochi-red rounded-md transition-all duration-200"
                  >
                    {category.icon && (
                      <category.icon className="h-6 w-6 mb-1" />
                    )}
                    <span className="text-xs sm:text-sm font-medium">
                      {category.name}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {selectedCategory.items.map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-12 text-cochi-brown/80">
          <p className="mb-3 text-base">{content.menuFooterText}</p>
          <a
            href="https://www.facebook.com/cochiskitchen/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cochi-red hover:text-cochi-red-dark font-medium transition-colors duration-200 group"
          >
            {content.facebookSpecialsLinkText}
            <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Item Popup - Pass individual props */}
      <ImagePopup
        isOpen={!!selectedItem}
        onClose={closeItemPopup}
        {...(selectedItem || {})} // Spread item properties if selectedItem exists
        title={selectedItem?.name || ""}
        description={selectedItem?.description || ""}
        price={selectedItem?.price}
        image={selectedItem?.image || ""}
        imageAlt={`${selectedItem?.name || "Item"} image`}
      />
    </section>
  );
};

export default Menu;
