import { artistSlug } from "@/lib/artistSlug";

export const ARTIST_SUGGESTIONS = [
  {
    name: "Linkin Park",
    mbid: "7be69b04-2689-4c09-9834-abcb9632668d",
    genre: "Alternative Rock",
    reason: "Big hooks, high energy, and iconic 2000s records.",
  },
  {
    name: "Taylor Swift",
    mbid: "20244d07-274f-4073-9b8a-bd9e96eb9d6f",
    genre: "Pop",
    reason: "Strong songwriting and a massive range of eras.",
  },
  {
    name: "The Beatles",
    mbid: "b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d",
    genre: "Rock",
    reason: "A perfect starting point for classic albums.",
  },
  {
    name: "Coldplay",
    mbid: "72097636-ec2a-4761-2725-fea146aa3fc",
    genre: "Alternative Pop",
    reason: "Melodic songs that are easy to revisit often.",
  },
  {
    name: "Radiohead",
    mbid: "a74b1b53-fa81-41fc-bd55-78aabe137d72",
    genre: "Alternative",
    reason: "Inventive production and deeply rewarding records.",
  },
  {
    name: "Bad Bunny",
    mbid: "89aa5ecb-59ad-46f5-b3eb-2d424e941f19",
    genre: "Latin Urban",
    reason: "Modern reggaeton and pop with standout album runs.",
  },
  {
    name: "Daft Punk",
    mbid: "76bf3222-9fd7-4ebe-8d70-73e822ad64c",
    genre: "Electronic",
    reason: "Polished dance records with timeless production.",
  },
  {
    name: "J. Cole",
    mbid: "875203e1-8e58-4b86-8dcb-7190faf411c5",
    genre: "Hip-Hop",
    reason: "Thoughtful bars and consistently strong projects.",
  },
  {
    name: "SZA",
    mbid: "272989c8-5535-492d-a25c-9f58803e027f",
    genre: "R&B",
    reason: "Emotional writing with modern R&B production.",
  },
  {
    name: "Tame Impala",
    mbid: "63aa26c3-d59b-4da4-84ac-716b54f1ef4d",
    genre: "Psychedelic Pop",
    reason: "Dreamy textures and infectious grooves.",
  },
  {
    name: "Arctic Monkeys",
    mbid: "ada7a83c-e3e1-40f1-93f9-3e73dbc9298a",
    genre: "Indie Rock",
    reason: "Sharp lyricism and great progression across albums.",
  },
  {
    name: "Kendrick Lamar",
    mbid: "38113473-fa0c-4772-921f-28a53aae0c19",
    genre: "Hip-Hop",
    reason: "Conceptual albums that reward full listens.",
  },
];

export const ARTIST_SLUG_TO_MBID = Object.fromEntries(
  ARTIST_SUGGESTIONS.map(({ name, mbid }) => [artistSlug(name), mbid])
);
