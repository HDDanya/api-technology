import { AnalysisResult, KeywordsData } from 'shared/types';

const API_KEY = process.env.REACT_APP_APILAYER_API_KEY;
const headers = {
  'Content-Type': 'application/json',
  apikey: API_KEY || '',
};

export async function analyzeText(text: string): Promise<AnalysisResult> {
  const [keywordsData, sentimentData] = await Promise.all([
    fetch('https://api.apilayer.com/keyword', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        apikey: API_KEY || '',
      },
      body: text,
    }).then((res) => {
      if (!res.ok) throw new Error('Ошибка при извлечении ключевых слов');
      return res.json();
    }),

    fetch('https://api.apilayer.com/sentiment/analysis', {
      method: 'POST',
      headers,
      body: JSON.stringify({ text }),
    }).then((res) => {
      if (!res.ok) throw new Error('Ошибка при определении тональности');
      return res.json();
    }),
  ]);

  const keywords: KeywordsData[] = keywordsData.result || [];

  const sentiment: string =
    sentimentData.sentiment || sentimentData.label || 'Неизвестно';

  const words = text.trim().split(/\s+/).length;
  const chars = text.length;
  const sentences = text.split(/[.!?]/).filter((s) => s.trim()).length;

  return {
    keywords,
    sentiment,
    stats: { words, chars, sentences },
  };
}
