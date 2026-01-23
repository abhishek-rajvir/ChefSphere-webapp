import { useEffect, useState } from "react";
import { Star, Clock, Folder, Utensils } from "lucide-react";
import { getYoutubeId } from "@/lib/utils";
import FoodieService from "@/service/FoodieService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Utility to convert decimal to mixed fraction
const toFraction = (decimal) => {
  if (decimal === undefined || decimal === null || decimal === "") return "";
  const num = parseFloat(decimal);
  if (isNaN(num)) return decimal;
  if (Number.isInteger(num)) return num.toString();

  const whole = Math.floor(num);
  const frac = num - whole;

  if (frac < 0.001) return whole.toString();

  const tolerance = 1.0e-6;
  let h1 = 1,
    h2 = 0,
    k1 = 0,
    k2 = 1;
  let b = frac;
  do {
    let a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    if (Math.abs(b - a) < tolerance) break;
    b = 1 / (b - a);
  } while (Math.abs(frac - h1 / k1) > frac * tolerance && k1 < 100);

  const fractionStr = k1 === 1 ? `${h1}` : `${h1}/${k1}`;
  return whole > 0 ? `${whole} ${fractionStr}` : fractionStr;
};

export default function PostPage({ post: postId }) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    (async () => {
      try {
        setLoading(true);
        const data = await FoodieService.getPostsByNo(postId);
        setPostData(data);
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  if (loading) {
    return (
      <div className="p-8 text-center text-lg font-medium">
        Loading deliciousness...
      </div>
    );
  }

  if (error || !postData) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        {error || "Recipe not found"}
      </div>
    );
  }

  // Deduplicate and process data
  const {
    postTitle,
    description,
    videoURL,
    recipe_Details,
    list_Of_Ingredients,
    list_of_Steps,
    list_of_categorys,
  } = postData;

  // Deduplicate steps by step_no
  const uniqueSteps = list_of_Steps
    ? Array.from(
        new Map(list_of_Steps.map((step) => [step.step_no, step])).values(),
      ).sort((a, b) => a.step_no - b.step_no)
    : [];

  const videoId = getYoutubeId(videoURL || postData.videoUrl);
  const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 bg-background text-foreground">
      {/* SECTION 1: Header */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 ring-1 ring-black/5">
          <img
            src={thumbnail}
            alt={postTitle}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
          />
        </div>

        <div className="space-y-4 px-4 w-full">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary">
            {postTitle}
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base font-semibold py-4 border-y border-border/50 w-full max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span>4.8 Rating</span>
            </div>

            {recipe_Details?.prepTime && (
              <div className="flex items-center gap-2 text-blue-500">
                <Clock className="w-5 h-5" />
                <span>{recipe_Details.prepTime} mins</span>
              </div>
            )}

            {list_of_categorys && list_of_categorys.length > 0 && (
              <div className="flex items-center gap-2 text-green-500">
                <Folder className="w-5 h-5" />
                <span>{list_of_categorys.map((c) => c.name).join(", ")}</span>
              </div>
            )}

            {recipe_Details?.number_of_servings && (
              <div className="flex items-center gap-2 text-orange-500">
                <Utensils className="w-5 h-5" />
                <span>{recipe_Details.number_of_servings} Servings</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* SECTION 2: Instructions */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
          <Clock className="w-6 h-6 text-primary" />
          Instructions
        </h2>
        <div className="space-y-6">
          {uniqueSteps.map((inst) => (
            <div
              key={inst.step_no}
              className="group flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md text-left">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors text-left">
                  Step {inst.step_no}: {inst.step_name}
                </h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed text-left">
                {inst.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 3: Ingredients */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
          <Utensils className="w-6 h-6 text-primary" />
          Ingredients
        </h2>
        <div className="mx-auto w-fit max-w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="px-6 py-3 font-bold text-base min-w-[150px]">
                  Ingredient
                </TableHead>
                <TableHead className="px-6 py-3 font-bold text-base min-w-[200px]">
                  Details
                </TableHead>
                <TableHead className="px-6 py-3 font-bold text-base text-center w-[80px]">
                  Qty
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list_Of_Ingredients?.map((ing, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-3 font-semibold">
                    {ing.name}
                  </TableCell>
                  <TableCell className="px-6 py-3 text-muted-foreground italic">
                    {ing.description || "-"}
                  </TableCell>
                  <TableCell className="px-6 py-3 font-bold text-center text-primary whitespace-nowrap">
                    {toFraction(ing.qty)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <hr className="border-t border-gray-200" />

      {/* SECTION 4: Video */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold px-2">Video Tutorial</h2>
        <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black ring-4 ring-white dark:ring-gray-800">
          <iframe
            width="100%"
            height="100%"
            src={videoEmbedUrl}
            title={postTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"></iframe>
        </div>
      </section>
    </div>
  );
}
