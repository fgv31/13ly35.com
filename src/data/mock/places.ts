export interface Place {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  date: string;
  description: string;
  category: "lived" | "visited" | "bucket-list";
}

export const places: Place[] = [
  {
    id: "1",
    name: "Berlin",
    country: "Germany",
    coordinates: [13.405, 52.52],
    date: "2023 - Present",
    description: "Current base. Creative capital of Europe.",
    category: "lived",
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    coordinates: [139.6917, 35.6895],
    date: "2022",
    description: "Where tradition meets the future. Mind-expanding trip.",
    category: "visited",
  },
  {
    id: "3",
    name: "Lisbon",
    country: "Portugal",
    coordinates: [-9.1393, 38.7223],
    date: "2021",
    description: "Vibrant coastal vibes. Amazing food and people.",
    category: "visited",
  },
  {
    id: "4",
    name: "New York",
    country: "USA",
    coordinates: [-74.006, 40.7128],
    date: "2020",
    description: "The city that never sleeps. Pure energy.",
    category: "visited",
  },
  {
    id: "5",
    name: "Seoul",
    country: "South Korea",
    coordinates: [126.978, 37.5665],
    date: "Someday",
    description: "K-culture, tech, and incredible street food.",
    category: "bucket-list",
  },
];
