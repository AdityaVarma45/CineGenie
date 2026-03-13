export default function AIExplanation({ text }) {

  if (!text) return null;

  return (
    <div className="mt-6 p-4 border bg-gray-100">

      <h2 className="font-bold mb-2">
        AI Explanation
      </h2>

      <pre className="whitespace-pre-wrap">
        {text}
      </pre>

    </div>
  );
}