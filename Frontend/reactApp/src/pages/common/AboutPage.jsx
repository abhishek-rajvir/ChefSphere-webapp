import React from "react";
import { Utensils, Heart, Globe, Clock, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-sans text-gray-800 dark:text-gray-200">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
          About ChefSphere
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Where food lovers, home cooks, and creators unite.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <p className="text-lg leading-relaxed">
          ChefSphere is a place where food lovers, home cooks, and creators come
          together to share what they love most is great recipes and real
          cooking experiences. From quick weeknight dinners to traditional
          dishes passed down through generations, ChefSphere celebrates food in
          all its forms.
        </p>

        <p className="text-lg leading-relaxed">
          Whether you’re flipping pancakes on a Sunday morning, perfecting a
          classic pasta, or experimenting with flavors from around the world,
          you’ll find inspiration here. Our platform is built around community.
          Follow your favorite creators, discover new cuisines, explore curated
          categories, and save recipes you’ll come back to again and again.
        </p>

        <p className="text-lg font-semibold text-primary">
          Every dish tells a story, and ChefSphere is where those stories are
          shared.
        </p>

        <div className="bg-muted/30 p-8 rounded-2xl border border-border/50 shadow-sm mt-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-primary" />
            We believe cooking should be:
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-500 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Enjoyable</h3>
                <p className="text-muted-foreground">
                  Not intimidating, but fun and rewarding.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-500 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Inclusive</h3>
                <p className="text-muted-foreground">
                  Of all cuisines, cultures, and skill levels.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-500 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Flexible</h3>
                <p className="text-muted-foreground">
                  For both quick meals and slow cooking days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-green-500 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Community Driven</h3>
                <p className="text-muted-foreground">
                  Powered by creators and real kitchens like yours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-xl font-medium italic">
            "Whether you’re here to learn, share, or simply scroll when you’re
            hungry, ChefSphere is your space."
          </p>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Meet the Developers
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/abhishek-rajvir"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-primary/20 transition-colors cursor-pointer">
              Abhishek Rajvir
            </a>
            <a
              href="https://github.com/Ruturaj-Raut-27"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-primary/20 transition-colors cursor-pointer">
              Ruturaj Raut
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
