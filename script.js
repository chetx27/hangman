import { useState } from "react";
import { createRoot } from "react-dom/client";

// Sample game data
const GAMES = [
  {
    id: 1,
    title: "Cosmic Conquest",
    description: "An epic space strategy game with deep resource management and diplomacy.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["Strategy", "Sci-Fi", "4X"],
    platforms: ["PC", "Mac"],
    multiplayer: false,
    pace: "Slow",
    complexity: "High",
  },
  {
    id: 2,
    title: "Neon Fury",
    description: "Fast-paced cyberpunk shooter with stunning visuals and intense combat.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["Action", "FPS", "Cyberpunk"],
    platforms: ["PC", "PlayStation", "Xbox"],
    multiplayer: true,
    pace: "Fast",
    complexity: "Medium",
  },
  {
    id: 3,
    title: "Verdant Valley",
    description: "Relaxing farming simulator where you build your dream homestead.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["Simulation", "Casual", "Life Sim"],
    platforms: ["PC", "Switch", "Mobile"],
    multiplayer: false,
    pace: "Slow",
    complexity: "Low",
  },
  {
    id: 4,
    title: "Legends Arena",
    description: "Competitive team-based battle game with unique heroes and abilities.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["MOBA", "Strategy", "Action"],
    platforms: ["PC", "Mobile"],
    multiplayer: true,
    pace: "Fast",
    complexity: "High",
  },
  {
    id: 5,
    title: "Mystic Realms",
    description: "Immersive fantasy RPG with a vast open world and compelling storyline.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["RPG", "Fantasy", "Open World"],
    platforms: ["PC", "PlayStation", "Xbox"],
    multiplayer: false,
    pace: "Medium",
    complexity: "High",
  },
  {
    id: 6,
    title: "Velocity Rush",
    description: "High-octane racing game with futuristic vehicles and impossible tracks.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["Racing", "Arcade", "Futuristic"],
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
    multiplayer: true,
    pace: "Fast",
    complexity: "Low",
  },
  {
    id: 7,
    title: "Puzzle Dimensions",
    description: "Mind-bending puzzle game that plays with physics and perspective.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["Puzzle", "Casual", "Indie"],
    platforms: ["PC", "Mobile", "Switch"],
    multiplayer: false,
    pace: "Slow",
    complexity: "Medium",
  },
  {
    id: 8,
    title: "Survival Horizon",
    description: "Post-apocalyptic survival game where every decision matters.",
    image: "/placeholder.svg?height=300&width=200",
    genres: ["Survival", "Open World", "Crafting"],
    platforms: ["PC", "PlayStation", "Xbox"],
    multiplayer: true,
    pace: "Medium",
    complexity: "High",
  },
];

// Contrasting choices for the game selector
const CHOICES = [
  {
    id: "pace",
    question: "Do you prefer fast-paced action or a more relaxed experience?",
    options: [
      { value: "Fast", label: "Fast-paced", description: "Quick reflexes, intense action" },
      { value: "Slow", label: "Relaxed", description: "Take your time, think things through" },
    ],
  },
  {
    id: "multiplayer",
    question: "Do you want to play with others or enjoy a solo experience?",
    options: [
      { value: true, label: "Multiplayer", description: "Compete or cooperate with other players" },
      { value: false, label: "Single-player", description: "Focus on your own journey" },
    ],
  },
  {
    id: "complexity",
    question: "How complex do you want your game to be?",
    options: [
      { value: "High", label: "Complex", description: "Deep systems, steep learning curve" },
      { value: "Low", label: "Simple", description: "Easy to learn, pick up and play" },
    ],
  },
];

function GameCard({ game }) {
  return (
    <div className="card border-2 border-gray-700 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="p-4">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
        <p className="text-gray-300 mb-4">{game.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {game.genres.map(genre => (
            <span key={genre} className="px-2 py-1 bg-gray-700 rounded-full text-sm">
              {genre}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-400">
          Platforms: {game.platforms.join(", ")}
        </div>
      </div>
    </div>
  );
}

function GameSelector() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleChoice = (value) => {
    const updatedPreferences = { ...preferences, [CHOICES[currentStep].id]: value };
    setPreferences(updatedPreferences);

    if (currentStep < CHOICES.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate recommendations based on preferences
      const filteredGames = GAMES.filter((game) => {
        let score = 0;

        // Check each preference against the game properties
        Object.entries(updatedPreferences).forEach(([key, value]) => {
          if (game[key] === value) {
            score++;
          }
        });

        // Return games that match at least one preference
        return score > 0;
      });

      // Sort by how many preferences they match
      filteredGames.sort((a, b) => {
        const scoreA = Object.entries(updatedPreferences).filter(([key, value]) => a[key] === value).length;
        const scoreB = Object.entries(updatedPreferences).filter(([key, value]) => b[key] === value).length;
        return scoreB - scoreA;
      });

      setRecommendations(filteredGames.length > 0 ? filteredGames : GAMES);
      setShowResults(true);
    }
  };

  const resetSelector = () => {
    setCurrentStep(0);
    setPreferences({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your Game Recommendations</h2>
          <p className="text-gray-300 mb-8">Based on your preferences, we think you'll enjoy these games:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.slice(0, 6).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={resetSelector} 
            className="button button-outline flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const currentChoice = CHOICES[currentStep];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between mb-8">
        {CHOICES.map((choice, index) => (
          <div key={choice.id} className={`relative flex-1 ${index > 0 ? "ml-2" : ""}`}>
            <div
              className={`h-2 rounded-full ${
                index < currentStep ? "bg-pink-500" : index === currentStep ? "bg-cyan-400" : "bg-gray-700"
              }`}
            />
            <div
              className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                index < currentStep ? "bg-pink-500" : index === currentStep ? "bg-cyan-400" : "bg-gray-700"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{currentChoice.question}</h2>
        <p className="text-gray-300">
          Step {currentStep + 1} of {CHOICES.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentChoice.options.map((option) => (
          <div
            key={option.label}
            className="card border-2 border-gray-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
            onClick={() => handleChoice(option.value)}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{option.label}</h3>
                <p className="text-gray-300">{option.description}</p>
              </div>
              <button className="button button-ghost mt-4 self-end flex items-center gap-2">
                Select 
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<GameSelector />);