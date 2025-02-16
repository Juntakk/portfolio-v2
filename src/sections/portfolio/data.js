import images from "./images.js";
import iconsData from "./icons.js";
const { icons, mainIcons } = iconsData;

const data = [
  {
    id: 1,
    category: "Web",
    image: images.ChatImage,
    title: "Chatbot",
    mainIcon: mainIcons.chatbot,
    desc: "Python | Django | NumPy",
    icons: [icons.python, icons.django, icons.numpy, icons.html],
    demo: "",
    screenShot: images.chatbotScreenShot,
    github: "https://github.com/Juntakk/chat-bot",
    info: "AI Project: I am developing a chatbot that I plan to integrate into this portfolio. I am using tools like NumPy, TensorFlow, and other libraries. Project in progress, more details coming soon.",
  },
  {
    id: 2,
    category: "Web",
    image: images.seeFlix,
    title: "Seeflix",
    mainIcon: mainIcons.seeFlix,
    icons: [icons.react, icons.node, icons.mongo, icons.tailwind],
    screenShot: images.seeflixScreenshots,
    desc: "ReactJS | NodeJS | MongoDB",
    demo: "https://seeflix.netlify.app/",
    github: "https://github.com/Juntakk/SeeFlix",
    info: "Movie search platform that allows users to search and view details of thousands of movies. Using the IMDb API, users can browse this site in real time.",
  },
  {
    id: 3,
    category: "Web",
    image: images.Image9,
    title: "E-Commerce",
    mainIcon: mainIcons.steem,
    icons: [icons.react, icons.node, icons.mongo, icons.css],
    desc: "ReactJS | NodeJS | MongoDB",
    screenShot: images.steemScreenshots,
    demo: "https://steemgames.netlify.app/",
    github: "https://github.com/Juntakk/steem",
    info: "Commerce and management platform that allows users to browse all video games in a Mongoose database, sort them by category, and add them to their wishlist.",
  },
  {
    id: 4,
    category: "Games",
    image: images.Image3,
    title: "Bullet-hell Game",
    mainIcon: mainIcons.survivors,
    icons: [icons.cplusplus, icons.godot],
    screenShot: images.survivorsScreenshots,
    desc: "C++ | Godot | GDscript",
    demo: "",
    github: "https://github.com/Juntakk/survivors",
    info: "2D bullet-hell game where the player can choose their character and battlefield. With automatic attacks, they fight hordes of enemies, level up, and improve their skills.",
  },
  {
    id: 5,
    category: "Games",
    image: images.Image7,
    title: "RPG game",
    mainIcon: mainIcons.rpg,
    icons: [icons.cplusplus, icons.raylib, icons.unreal],
    desc: "C++ | Raylib | Unreal Engine",
    screenShot: images.game3ScreenShot,
    demo: "",
    github: "https://github.com/Juntakk/mini-game-3",
    info: "Top-down 2D RPG where the player chooses their character and is thrown into a medieval fantasy world, where they must fight enemies and fill their inventory with powerful items to survive.",
  },
  {
    id: 6,
    category: "Web",
    image: images.Image12,
    title: "Diet App",
    mainIcon: mainIcons.recipes,
    icons: [icons.next, icons.tailwind, icons.shadCn],
    desc: "NextJS | Tailwind | Clean",
    screenShot: images.dietAppScreenshot,
    demo: "https://diet-app-ten.vercel.app/",
    github: "https://github.com/Juntakk/diet_app",
    info: "Meal planning web App in development, more functionalities to come, personal app to help me manage my diet and groceries better.",
  },
  {
    id: 7,
    category: "Mobile",
    image: images.BlogImage,
    title: "Blog App",
    mainIcon: mainIcons.blog,
    icons: [icons.flutter, icons.dart],
    desc: "Flutter | Bloc | Clean",
    demo: "",
    screenShot: images.blogScreenshot,
    github: "https://github.com/Juntakk/blog_app",
    info: "Blog application using Clean Architecture and Bloc for state management. The user must create an account and log in to view blogs from other users and create, edit, or delete their own.",
  },
  {
    id: 8,
    category: "Mobile",
    image: images.favPlaces,
    title: "Souvenirs",
    mainIcon: mainIcons.places,
    icons: [icons.flutter, icons.dart],
    screenShot: images.favPlaces,
    desc: "",
    demo: "",
    github: "https://github.com/Juntakk/favorite-places",
    info: "Travel application using the Google Maps API and photo functionality to capture memories and save their location on the map. Built with Clean Architecture and Bloc for state management.",
  },
];

export default data;
