export type Category = "movies" | "music" | "objects" | "places";

export interface Recommendation {
  id: string;
  title: string;
  category: Category;
  rating: number; // 1-5
  description: string;
}

export const recommendations: Recommendation[] = [
  { id: "1", title: "Blade Runner 2049", category: "movies", rating: 5, description: "A visual masterpiece" },
  { id: "2", title: "The Grand Budapest Hotel", category: "movies", rating: 4, description: "Wes Anderson at his best" },
  { id: "3", title: "Dune", category: "movies", rating: 5, description: "Epic sci-fi adaptation" },
  { id: "4", title: "Daft Punk", category: "music", rating: 5, description: "Electronic music legends" },
  { id: "5", title: "Radiohead", category: "music", rating: 5, description: "Experimental rock pioneers" },
  { id: "6", title: "Tyler, the Creator", category: "music", rating: 4, description: "Creative genius" },
  { id: "7", title: "Keychron K2", category: "objects", rating: 5, description: "Perfect mechanical keyboard" },
  { id: "8", title: "Kindle Paperwhite", category: "objects", rating: 4, description: "Best e-reader" },
  { id: "9", title: "Sony WH-1000XM4", category: "objects", rating: 5, description: "Noise canceling perfection" },
  { id: "10", title: "Tokyo", category: "places", rating: 5, description: "Future meets tradition" },
  { id: "11", title: "Berlin", category: "places", rating: 5, description: "Creative capital" },
  { id: "12", title: "Lisbon", category: "places", rating: 4, description: "Vibrant coastal city" },
];
