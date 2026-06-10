interface Props {
  params: {
    id: string;
  };
}

export default function ProblemPage({ params }: Props) {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Problem {params.id}</h1>

      <p className="mt-4">Question details will go here.</p>
    </div>
  );
}
