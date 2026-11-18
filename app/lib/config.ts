// ============================================
// 🎀 PRINCESS DAY CONFIGURATION
// ============================================
// Edit these values to personalize the experience.
// No need to touch any component files!

export const siteConfig = {
  // The princess's name (used in headings & text)
  princessName: "Princess Jannat",

  // Your name (shown in the final signature)
  senderName: "Ayush",

  // Memory gallery photos
  // Replace src paths with your own photos in /public/photos/
  memories: [
    { id: 1, src: "/photos/image1.jpeg", caption: "Prettiest smile I know ♡", rotation: -3 },
    { id: 2, src: "/photos/image2.jpeg", caption: "Gorgeous, always ♡", rotation: 2 },
    { id: 3, src: "/photos/image3.jpeg", caption: "She doesn't know how beautiful she is ♡", rotation: -2 },
    { id: 4, src: "/photos/image4.jpeg", caption: "Together is my favorite ♡", rotation: 4 },
    { id: 5, src: "/photos/image5.jpeg", caption: "Always smiling ♡", rotation: -1 },
    { id: 6, src: "/photos/daraksha.jpeg", caption: "My favorite person ♡", rotation: 3 },
  ],

  // The personal letter (Screen 6)
  letterText: [
    "Thank you for being you…",
    "for making my days brighter,",
    "for filling my life with love,",
    "and for being someone truly special.",
    "",
    "You mean more to me than words can say,",
    "and I hope you always remember how precious you are.",
    "",
    "I hope you always keep smiling,",
    "because you deserve all the love,",
    "happiness and beautiful moments in this world.",
    "",
    "So whenever you forget how special you are,",
    "come back here and remember this.",
  ],
};

export type Memory = (typeof siteConfig.memories)[number];
