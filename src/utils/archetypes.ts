/**
 * Brain Archetype Definitions
 * Mapping scores to fun, shareable personality titles used for fallbacks and UI labels.
 */

export interface ArchetypeInfo {
  title: string;
  emoji: string;
  description: string;
}

export const getArchetypeByAge = (age: number): ArchetypeInfo => {
  if (age < 10) return { title: "The Infinite Explorer", emoji: "🌈", description: "Your imagination knows no bounds, viewing the world with pure wonder." };
  if (age < 18) return { title: "The Spirited Rebel", emoji: "🔥", description: "You challenge the status quo with high energy and bold ideas." };
  if (age < 25) return { title: "The Digital Nomad", emoji: "📱", description: "A perfect blend of modern tech-savviness and youthful curiosity." };
  if (age < 35) return { title: "The Mindful Architect", emoji: "🏗️", description: "You build your life with intention, balancing logic and emotion." };
  if (age < 45) return { title: "The Strategic Visionary", emoji: "🔭", description: "You see the big picture and navigate life with seasoned wisdom." };
  if (age < 60) return { title: "The Wise Sage", emoji: "📜", description: "A fountain of knowledge and steady perspective in a fast world." };
  return { title: "The Timeless Soul", emoji: "♾️", description: "You have transcended age, possessing a spirit that is both ancient and ever-new." };
};
