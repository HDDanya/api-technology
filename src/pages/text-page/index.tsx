import { TextStats } from 'entities/text-stats';
import { analyzeText } from 'features/text-analyzer';
import { useState } from 'react';
import { AnalysisResult } from 'shared/types';

export const TextAnalyzer = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const data = await analyzeText(input);
      setResult(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Произошла ошибка анализа текста');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text Analysis (APILayer)</h1>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <textarea
          className="w-full border rounded p-2 h-32"
          placeholder="Enter English text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-2">Error: {error}</p>}

      {result && <TextStats {...result} />}
    </div>
  );
};
