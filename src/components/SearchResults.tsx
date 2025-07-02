
import { Search, FileText, Image, Newspaper, Briefcase } from "lucide-react";

interface SearchResultsProps {
  query: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SearchResults = ({ query, activeTab, onTabChange }: SearchResultsProps) => {
  const tabs = [
    { id: "all", label: "All", icon: Search },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "images", label: "Images", icon: Image },
    { id: "news", label: "News", icon: Newspaper },
  ];

  const sampleResults = {
    all: [
      {
        title: "Me, Myself and I",
        url: "https://sayeed.dev/about",
        description: "I am a developer and technical writer located in Cameroon. I have a passion for creating dynamic, responsive, adaptable websites. Problem solver, high-attention to detail, and creative person. I strive for...",
      },
      {
        title: "An overview of my technical skills and interests",
        url: "https://sayeed.dev/about",
        description: "HTML, CSS, JavaScript, React, GraphQL, Gatsby, Python, Open Source, Hugo, Documentation, UI Design, UX Research, Inkscape.",
      },
    ],
    projects: [
      {
        title: "TutCode - site to simultaneously view tutorials and code",
        url: "https://github.com/sayeed/TutCode",
        description: "A website where people can simultaneously code and watch/read tutorials. It's a more convenient way to learn and practice how to code (with HTML, CSS and JavaScript) on the same page",
      },
      {
        title: "Portfolio Website",
        url: "https://sayeed.dev",
        description: "A personal website simulating the Google Search platform. Developed with HTML, CSS and React",
      },
      {
        title: "Personal Website",
        url: "https://sayeed.com",
        description: "My personal website, designed and developed from scratch. It features a lot of hover effects, custom styling and a blog.",
      },
    ],
  };

  const currentResults = sampleResults[activeTab as keyof typeof sampleResults] || sampleResults.all;

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Search Header */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex items-center space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 mb-6">
        About {currentResults.length} results (0.43 seconds)
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {currentResults.map((result, index) => (
          <div key={index} className="group">
            <div className="text-sm text-gray-600 mb-1">{result.url}</div>
            <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-2 group-hover:underline">
              {result.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {result.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
