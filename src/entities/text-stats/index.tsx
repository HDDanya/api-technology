import React from 'react';
import { AnalysisResult, KeywordsData } from 'shared/types';

export const TextStats: React.FC<AnalysisResult> = ({
  sentiment,
  keywords,
  stats,
}) => {
  return (
    <div className="bg-gray-100 rounded p-4 space-y-2">
      <p>
        <strong>🎭 Sentiment:</strong> {sentiment}
      </p>
      <div>
        <strong>🔑 Keywords:</strong>
        {keywords.length > 0 ? (
          <table className="w-full mt-2 border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1 text-left">Keyword</th>
                <th className="border px-2 py-1 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {(keywords as KeywordsData[]).map((kw, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{kw.text}</td>
                  <td className="border px-2 py-1">{kw.score.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>—</p>
        )}
      </div>
      <p>
        <strong>📊 Stats:</strong>{' '}
        {`Words: ${stats.words}, Characters: ${stats.chars}, Sentences: ${stats.sentences}`}
      </p>
    </div>
  );
};
