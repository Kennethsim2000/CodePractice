import Link from "next/link";

const questions = [
  {
    id: 1,
    title: "Binary Search",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Sliding Window Minimum",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Implement Trie",
    difficulty: "Medium",
  },
  {
    id: 4,
    title: "LRU Cache",
    difficulty: "Hard",
  },
  {
    id: 5,
    title: "Buffer Pool Manager",
    difficulty: "Hard",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-3">CPP Practice</h1>

        <p className="text-zinc-600 mb-10">
          Practice data structures, algorithms and systems programming.
        </p>

        <div className="space-y-4">
          {questions.map((question) => (
            <Link key={question.id} href={`/problems/${question.id}`}>
              <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">{question.title}</h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      question.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : question.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
