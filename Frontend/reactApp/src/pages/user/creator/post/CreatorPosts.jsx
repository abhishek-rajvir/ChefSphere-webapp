import PostTable from "./PostTable";

export default function CreatorPosts() {
  const mockPosts = [
    {
      id: "1",
      name: "First Post",
      description: "This is a description for the first post.",
      imageTag: "nature",
    },
    {
      id: "2",
      name: "Second Post",
      description: "Another interesting post description.",
      imageTag: "tech",
    },
    {
      id: "3",
      name: "Third Post",
      description: "Short description.",
      imageTag: "art",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Creator Posts</h1>
      <PostTable posts={mockPosts} />
    </div>
  );
}
