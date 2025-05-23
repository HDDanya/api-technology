export type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
export type Book = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
};
export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    links: { html: string };
  };
}
export type CoordinatesTuple = [number, number];
export interface MapProps {
  coords: CoordinatesTuple;
  display_name: string;
}
export type KeywordsData = {
  text: string;
  score: number;
};
export interface AnalysisResult {
  keywords: KeywordsData[];
  sentiment: string;
  stats: {
    words: number;
    chars: number;
    sentences: number;
  };
}
