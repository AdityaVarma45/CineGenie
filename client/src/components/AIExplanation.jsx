export default function AIExplanation({ text }) {
  if (!text) return null;

  return (
    <div className="ai-panel">
      <div className="ai-label">
        <span className="ai-dot" />
        Neural Analysis
      </div>
      <p className="ai-text">{text}</p>
    </div>
  );
}
