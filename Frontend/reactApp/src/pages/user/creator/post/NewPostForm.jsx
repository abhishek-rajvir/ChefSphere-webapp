import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { request, requestLog } from "../../../../jwt/axios_helper";
import CreatorService from "../../../../service/CreatorService";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NewPostForm() {
  const [formData, setFormData] = useState({
    post_title: "",
    description: "",
    videoUrl: "",
    recipe_Details: {
      recipe_name: "",
      description: "",
      prepTime: 0,
      number_of_servings: 0,
    },
    set_of_categorys: [
      {
        name: "",
        image: null,
      },
      {
        name: "",
        image: null,
      },
    ],
    list_Of_Ingredients: [
      {
        name: "",
        description: "",
        qty: 0.0,
        unit: "g",
      },
    ],
    list_of_Steps: [
      {
        step_no: 0,
        step_name: "",
        content: "",
      },
      {
        step_no: 0,
        step_name: "",
        content: "",
      },
      {
        step_no: 0,
        step_name: "",
        content: "",
      },
      {
        step_no: 0,
        step_name: "",
        content: "",
      },
    ],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecipeChange = (e) => {
    const { name, value, type } = e.target;
    let val =
      type === "number" ? (value === "" ? "" : parseFloat(value)) : value;
    if (type === "number" && val < 0) val = 0;
    setFormData((prev) => ({
      ...prev,
      recipe_Details: { ...prev.recipe_Details, [name]: val },
    }));
  };

  // Categories
  const addCategory = () => {
    setFormData((prev) => ({
      ...prev,
      set_of_categorys: [...prev.set_of_categorys, { name: "", image: null }],
    }));
  };

  const removeCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      set_of_categorys: prev.set_of_categorys.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...formData.set_of_categorys];
    newCategories[index][field] = value;
    setFormData((prev) => ({ ...prev, set_of_categorys: newCategories }));
  };

  // Ingredients
  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      list_Of_Ingredients: [
        ...prev.list_Of_Ingredients,
        { name: "", description: "", qty: 0, unit: "g" },
      ],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      list_Of_Ingredients: prev.list_Of_Ingredients.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.list_Of_Ingredients];

    // Check if the field is 'qty' and treat it as a number
    if (field === "qty") {
      let val = value === "" ? "" : parseFloat(value);
      if (val < 0) val = 0;
      newIngredients[index][field] = val;
    } else {
      newIngredients[index][field] = value;
    }

    setFormData((prev) => ({
      ...prev,
      list_Of_Ingredients: newIngredients,
    }));
  };

  // Steps
  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      list_of_Steps: [
        ...prev.list_of_Steps,
        {
          step_no: prev.list_of_Steps.length + 1,
          step_name: "",
          content: "",
        },
      ],
    }));
  };

  const removeStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      list_of_Steps: prev.list_of_Steps.filter((_, i) => i !== index),
    }));
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.list_of_Steps];
    newSteps[index][field] = value;
    setFormData((prev) => ({ ...prev, list_of_Steps: newSteps }));
  };

  const validateForm = () => {
    // Basic Info validation
    if (!formData.post_title.trim()) return "Post title is required";
    if (!formData.description.trim()) return "Post description is required";
    if (!formData.videoUrl.trim()) return "Video URL is required";

    // Recipe Details validation
    const { recipe_name, description, prepTime, number_of_servings } =
      formData.recipe_Details;
    if (!recipe_name.trim()) return "Recipe name is required";
    if (!description.trim()) return "Recipe description is required";
    if (Number(prepTime) <= 0) return "Prep time must be greater than 0";
    if (Number(number_of_servings) <= 0)
      return "Number of servings must be greater than 0";

    // Categories validation
    if (formData.set_of_categorys.length === 0)
      return "At least one category is required";
    for (const cat of formData.set_of_categorys) {
      if (!cat.name.trim()) return "All categories must have a name";
    }

    // Ingredients validation
    if (formData.list_Of_Ingredients.length === 0)
      return "At least one ingredient is required";
    for (const ing of formData.list_Of_Ingredients) {
      if (!ing.name.trim()) return "All ingredients must have a name";
      if (!ing.description.trim())
        return "All ingredients must have a description";
      if (Number(ing.qty) <= 0) return "Ingredient quantity must be positive";
    }

    const ingredientNames = formData.list_Of_Ingredients.map((ing) =>
      ing.name.trim().toLowerCase(),
    );
    const uniqueIngredients = new Set(ingredientNames);
    if (uniqueIngredients.size !== ingredientNames.length) {
      return "Duplicate ingredients found. Please ensure all ingredients have unique names.";
    }

    // Steps validation
    if (formData.list_of_Steps.length === 0)
      return "At least one step is required";
    for (const step of formData.list_of_Steps) {
      if (!step.step_name.trim()) return "All steps must have a name";
      if (!step.content.trim()) return "All steps must have content";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
    try {
      const res = await CreatorService.newCreatorPost(formData);
      requestLog("Created new Post " + res.post_title);
      toast.success("Post created successfully");
      navigate("/creators/posts");
    } catch (err) {
      toast.error("Failed to create post");
      return;
    }
  };

  // Helper for flexible textarea
  const Textarea = (props) => (
    <textarea
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="post_title">Post Title</Label>
                  <Input
                    id="post_title"
                    name="post_title"
                    value={formData.post_title}
                    onChange={handleChange}
                    placeholder="e.g. Triple chocolate mousse"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Short description of the post"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="e.g. https://www.youtube.com/watch?v=VIDEO_ID"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Recipe Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recipe Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipe_name">Recipe Name</Label>
                  <Input
                    id="recipe_name"
                    name="recipe_name"
                    value={formData.recipe_Details.recipe_name}
                    onChange={handleRecipeChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prepTime">Prep Time (mins)</Label>
                  <Input
                    id="prepTime"
                    name="prepTime"
                    type="number"
                    value={formData.recipe_Details.prepTime}
                    onChange={handleRecipeChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="number_of_servings">Servings</Label>
                  <Input
                    id="number_of_servings"
                    name="number_of_servings"
                    type="number"
                    value={formData.recipe_Details.number_of_servings}
                    onChange={handleRecipeChange}
                  />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="recipe_desc">Recipe Description</Label>
                  <Textarea
                    id="recipe_desc"
                    name="description"
                    value={formData.recipe_Details.description}
                    onChange={handleRecipeChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Categories */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Categories</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCategory}>
                  <Plus className="w-4 h-4 mr-2" /> Add Category
                </Button>
              </div>
              <div className="grid gap-4">
                {formData.set_of_categorys.map((cat, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="grid gap-2 flex-1">
                      <Label>Name</Label>
                      <Input
                        value={cat.name}
                        onChange={(e) =>
                          handleCategoryChange(index, "name", e.target.value)
                        }
                        placeholder="Category Name"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeCategory(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Ingredients */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addIngredient}>
                  <Plus className="w-4 h-4 mr-2" /> Add Ingredient
                </Button>
              </div>
              <div className="grid gap-4">
                {formData.list_Of_Ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive"
                      onClick={() => removeIngredient(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="md:col-span-3 grid gap-2">
                      <Label>Name</Label>
                      <Input
                        value={ing.name}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                        placeholder="e.g. Flour"
                      />
                    </div>
                    <div className="md:col-span-4 grid gap-2">
                      <Label>Description</Label>
                      <Input
                        value={ing.description}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. All purpose"
                      />
                    </div>
                    <div className="md:col-span-2 grid gap-2">
                      <Label>Qty</Label>
                      <Input
                        type="number"
                        step="0.25"
                        value={ing.qty}
                        onChange={(e) =>
                          handleIngredientChange(index, "qty", e.target.value)
                        }
                        placeholder="e.g. 500"
                      />
                    </div>
                    <div className="md:col-span-3 grid gap-2">
                      <Label>Unit</Label>
                      <Select
                        value={ing.unit || "g"}
                        onValueChange={(val) =>
                          handleIngredientChange(index, "unit", val)
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Weight</SelectLabel>
                            <SelectItem value="g">gram (g)</SelectItem>
                            <SelectItem value="kg">kilogram (kg)</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Volume</SelectLabel>
                            <SelectItem value="ml">milliliter (ml)</SelectItem>
                            <SelectItem value="l">liter (l)</SelectItem>
                            <SelectItem value="tsp">teaspoon (tsp)</SelectItem>
                            <SelectItem value="tbsp">
                              tablespoon (tbsp)
                            </SelectItem>
                            <SelectItem value="cup">cup</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Count / Pieces</SelectLabel>
                            <SelectItem value="pcs">pieces (pcs)</SelectItem>
                            <SelectItem value="nos">numbers (nos)</SelectItem>
                            <SelectItem value="cloves">cloves</SelectItem>
                            <SelectItem value="fillets">fillets</SelectItem>
                            <SelectItem value="sheets">sheets</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Herbs / Small Amounts</SelectLabel>
                            <SelectItem value="leaves">leaves</SelectItem>
                            <SelectItem value="pinch">pinch</SelectItem>
                            <SelectItem value="dash">dash</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Steps */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Steps</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addStep}>
                  <Plus className="w-4 h-4 mr-2" /> Add Step
                </Button>
              </div>
              <div className="space-y-4">
                {formData.list_of_Steps.map((step, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg space-y-4 relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive"
                      onClick={() => removeStep(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="grid gap-2">
                      <Label>Step Name</Label>
                      <Input
                        value={step.step_name}
                        onChange={(e) =>
                          handleStepChange(index, "step_name", e.target.value)
                        }
                        placeholder="e.g. Preheat oven"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Content</Label>
                      <Textarea
                        value={step.content}
                        onChange={(e) =>
                          handleStepChange(index, "content", e.target.value)
                        }
                        placeholder="Step details..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit}>
                Create Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
