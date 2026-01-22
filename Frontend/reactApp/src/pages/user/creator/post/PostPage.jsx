import { useEffect, useState } from "react";
import { Star, Clock, Folder, Utensils, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestLog } from "../../../../jwt/axios_helper";

export default function PostPage({ uid, pid }) {
  // Mock data for the post
  const [post, setPost] = useState({
    title: "Creamy Garlic Butter Salmon",
    image: "https://dummyjson.com/image/600x600/salmon/000000?text=Salmon+Dish",
    rating: 4.8,
    cookTime: "25 mins",
    category: "Dinner",
    servings: "4 People",
    ingredients: [
      {
        name: "Salmon fillets",
        quantity: "4 (6oz each)",
        detail: "Skin-on or off",
      },
      { name: "Butter", quantity: "4 tbsp", detail: "Unsalted, divided" },
      { name: "Garlic", quantity: "4 cloves", detail: "Minced" },
      { name: "Lemon juice", quantity: "1 tbsp", detail: "Freshly squeezed" },
      { name: "Parsley", quantity: "2 tbsp", detail: "Fresh, chopped" },
      { name: "Asparagus", quantity: "1 bunch", detail: "Trimmed" },
    ],
    instructions: [
      {
        step: 1,
        text: "Season the salmon fillets generously with salt and pepper on both sides.",
        image: "https://dummyjson.com/image/400x300/e0e0e0/000000?text=Step+1",
      },
      {
        step: 2,
        text: "In a large skillet, melt 2 tablespoons of butter over medium-high heat. Add salmon, skin-side down, and cook for 6 minutes until golden and crispy.",
        image: null,
      },
      {
        step: 3,
        text: "Flip the salmon and cook for another 2 minutes. Remove from pan and set aside.",
        image: "https://dummyjson.com/image/400x300/e0e0e0/000000?text=Step+3",
      },
      {
        step: 4,
        text: "In the same pan, add remaining butter, garlic, and lemon juice. Cook for 1 minute until fragrant.",
        image: null,
      },
      {
        step: 5,
        text: "Return salmon to the pan and spoon the sauce over it. Garnish with parsley and serve immediately.",
        image: null,
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    creator: {
      name: "Chef Anna",
      avatar: "https://dummyjson.com/image/100x100/ffcc00/000000?text=Anna",
      bio: "Passionate home cook sharing simple, delicious, and healthy recipes for busy families. Lover of fresh ingredients and bold flavors!",
    },
  });

  const getPost = async (pid) => {
    requestLog("fetched post no : " + pid + " for creator " + uid);
    const post = await creatorService.getCreatorsPostsById(pid);
    setPost(post);
  };

  useEffect(() => {
    getPost(pid);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-12">
      {/* SECTION 1: Header */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-4 border-white ring-2 ring-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600 font-medium">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span>{post.rating} / 5</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.cookTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5" />
              <span>{post.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5" />
              <span>{post.servings}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* SECTION 2: Ingredients */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {post.ingredients.map((ing, idx) => (
            <li
              key={idx}
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
              <span className="font-bold mr-2">{ing.quantity}</span>
              <span className="text-gray-700">{ing.name}</span>
              {ing.detail && (
                <span className="text-gray-400 text-sm ml-auto italic">
                  - {ing.detail}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 3: Instructions */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Instructions</h2>
        <div className="space-y-8">
          {post.instructions.map((inst) => (
            <div key={inst.step} className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {inst.step}
                </div>
              </div>
              <div className="flex-grow space-y-4">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {inst.text}
                </p>
                {inst.image && (
                  <div className="rounded-xl overflow-hidden shadow-md max-w-md">
                    <img
                      src={inst.image}
                      alt={`Step ${inst.step}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 4: Video */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Watch How to Make It</h2>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
          <iframe
            width="100%"
            height="100%"
            src={post.videoUrl}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </section>

      {/* SECTION 5: Creator Details */}
      <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={post.creator.avatar}
                alt={post.creator.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-grow text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold text-gray-900">
                {post.creator.name}
              </h3>
              <span className="text-primary font-medium">
                Nice to meet you! 👋
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{post.creator.bio}</p>
            <Button variant="outline" className="mt-2">
              View Profile
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6: Ratings */}
      <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Ratings</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 rounded-xl min-w-[150px]">
            <span className="text-5xl font-bold text-gray-900">
              {post.rating}
            </span>
            <div className="flex gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(post.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">
              128 ratings
            </span>
          </div>

          {/* Rating Distribution */}
          <div className="flex-grow w-full space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-bold w-3">{star}</span>
                <Star className="w-4 h-4 text-gray-400" />
                <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{
                      width:
                        star === 5
                          ? "70%"
                          : star === 4
                            ? "20%"
                            : star === 3
                              ? "5%"
                              : "2%",
                    }}></div>
                </div>
                <span className="text-sm text-gray-400 w-8 text-right">
                  {star === 5
                    ? "70%"
                    : star === 4
                      ? "20%"
                      : star === 3
                        ? "5%"
                        : "2%"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User Rating Input */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="mb-4 text-gray-600 font-medium">Rate this recipe</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Comments Box */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Leave a Comment</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <textarea
            className="w-full min-h-[120px] p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-y"
            placeholder="Share your thoughts about this recipe..."></textarea>
          <div className="flex justify-end mt-4">
            <Button className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Post Comment
            </Button>
          </div>
        </div>

        {/* Existing Comments List */}
        <div className="mt-12 space-y-8">
          <h3 className="text-xl font-bold mb-6">User Reviews</h3>
          {[
            {
              id: 1,
              name: "Sarah Jenkins",
              avatar: "https://dummyjson.com/image/50x50/ff99cc/000000?text=S",
              date: "2 days ago",
              content:
                "This recipe is a game changer! The garlic butter sauce is absolutely divine. My whole family loved it, even the picky eaters.",
              likes: 24,
            },
            {
              id: 2,
              name: "Mike Ross",
              avatar: "https://dummyjson.com/image/50x50/3366cc/ffffff?text=M",
              date: "1 week ago",
              content:
                "Simple to make but tastes like restaurant quality. I added a bit more lemon for extra zing, highly recommend!",
              likes: 15,
            },
            {
              id: 3,
              name: "Emily Chen",
              avatar: "https://dummyjson.com/image/50x50/66cc66/ffffff?text=E",
              date: "2 weeks ago",
              content:
                "Used trout instead of salmon and it worked perfectly. The cooking times were spot on. Thanks for sharing!",
              likes: 8,
            },
          ].map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex-shrink-0">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">{comment.name}</h4>
                    <span className="text-sm text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {comment.content}
                </p>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-gray-500 hover:text-red-500 hover:bg-red-50">
                    ❤️ {comment.likes} Likes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
