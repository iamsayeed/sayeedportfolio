
import { useState } from "react";
import { Search, X, Grid3X3, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showApps, setShowApps] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const portfolioSections = [
    { name: "About", icon: "ℹ️", color: "bg-blue-500", link: "/about" },
    { name: "Works", icon: "💼", color: "bg-gray-700", link: "/works" },
    { name: "Blog", icon: "📰", color: "bg-orange-500", link: "#blog" },
    { name: "Images", icon: "🖼️", color: "bg-green-600", link: "#images" },
    { name: "Email", icon: "✉️", color: "bg-red-500", link: "mailto:sayeed@example.com" },
    { name: "GitHub", icon: "💻", color: "bg-gray-900", link: "https://github.com" },
    { name: "LinkedIn", icon: "💼", color: "bg-blue-600", link: "https://linkedin.com" },
  ];

  const quickSuggestions = [
    { text: "about", route: "/about" },
    { text: "projects", route: "/works" },
    { text: "works", route: "/works" },
    { text: "skills", route: "/about" },
    { text: "contact", route: "/about" },
    { text: "experience", route: "/about" }
  ];

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    const matchingSuggestion = quickSuggestions.find(s => 
      query.includes(s.text) || s.text.includes(query)
    );

    if (matchingSuggestion) {
      navigate(matchingSuggestion.route);
    } else {
      navigate(`/about?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion: { text: string; route: string }) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    navigate(suggestion.route);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSearchClick = () => {
    setShowSuggestions(true);
  };

  const handleViewAnotherWebsite = () => {
    setShowProfile(false);
    navigate('/about');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="text-sm text-gray-600">Cameroon</div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <a 
            href="mailto:sayeed@example.com" 
            className="text-sm text-gray-600 hover:underline transition-all duration-200 hover:text-gray-800"
          >
            Email
          </a>
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:underline transition-all duration-200 hover:text-gray-800"
          >
            GitHub
          </a>
          <button 
            onClick={() => setShowApps(!showApps)}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 relative"
          >
            <Grid3X3 className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 relative"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* Apps Grid Overlay */}
      {showApps && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setShowApps(false)}
          />
          <div className="fixed top-16 right-4 bg-white rounded-lg shadow-xl border p-6 z-50 w-80 max-w-[90vw]">
            <div className="grid grid-cols-3 gap-4">
              {portfolioSections.map((section, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (section.link.startsWith('/')) {
                      navigate(section.link);
                    } else if (section.link.startsWith('mailto:')) {
                      window.location.href = section.link;
                    } else {
                      window.open(section.link, '_blank', 'noopener,noreferrer');
                    }
                    setShowApps(false);
                  }}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
                >
                  <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center text-white text-xl mb-2 group-hover:scale-110 transition-transform duration-200`}>
                    {section.icon}
                  </div>
                  <span className="text-xs text-gray-700 text-center">{section.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Profile Card Overlay */}
      {showProfile && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setShowProfile(false)}
          />
          <div className="fixed top-16 right-4 bg-white rounded-2xl shadow-2xl border p-8 z-50 w-80 max-w-[90vw]">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Sayeed</h3>
              <p className="text-gray-600 text-sm mb-6">sayeed@example.com</p>
              
              <button 
                onClick={handleViewAnotherWebsite}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 mb-4 font-medium"
              >
                View Another Website Design
              </button>
              
              <div className="border-t pt-4">
                <button 
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/about');
                  }}
                  className="flex items-center justify-center w-full text-gray-600 hover:text-gray-800 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  <User className="w-4 h-4 mr-2" />
                  More about me
                </button>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">GitHub</h4>
                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  <button 
                    onClick={() => window.open('https://github.com', '_blank')}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    View code
                  </button>
                  <span>•</span>
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      navigate('/works');
                    }}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    Blog & news
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] px-4">
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal">
            <span className="text-blue-500">S</span>
            <span className="text-red-500">a</span>
            <span className="text-yellow-500">y</span>
            <span className="text-blue-500">e</span>
            <span className="text-green-500">e</span>
            <span className="text-red-500">d</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl mb-6 md:mb-8 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onClick={handleSearchClick}
              placeholder="Search my portfolio..."
              className={`w-full pl-12 pr-12 py-3 text-lg rounded-full hover:shadow-lg focus:shadow-xl transition-all duration-300 ${
                isSearchFocused 
                  ? 'border-transparent focus:border-transparent focus:ring-0 shadow-xl' 
                  : 'border-2 border-gray-200 hover:border-gray-300'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow-2xl mb-6 md:mb-8 z-30">
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">Quick suggestions:</div>
              {quickSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center py-2 px-2 hover:bg-gray-50 rounded cursor-pointer transition-all duration-200"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">{suggestion.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-md">
          <Button 
            onClick={handleSearch}
            className="px-6 py-3 bg-gray-50 text-gray-700 border border-gray-300 rounded hover:shadow-md hover:bg-gray-100 transition-all duration-200 flex-1 font-medium"
          >
            Search Website
          </Button>
          <Button 
            onClick={() => navigate('/works')}
            className="px-6 py-3 bg-gray-50 text-gray-700 border border-gray-300 rounded hover:shadow-md hover:bg-gray-100 transition-all duration-200 flex-1 font-medium"
          >
            I'm Feeling Lucky
          </Button>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-gray-200 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
            <Link to="/about" className="text-sm text-gray-600 hover:underline transition-all duration-200">About</Link>
            <Link to="/works" className="text-sm text-gray-600 hover:underline transition-all duration-200">Projects</Link>
            <a href="#blog" className="text-sm text-gray-600 hover:underline transition-all duration-200">Blog</a>
            <a href="mailto:sayeed@example.com" className="text-sm text-gray-600 hover:underline transition-all duration-200">Email</a>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline transition-all duration-200">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline transition-all duration-200">LinkedIn</a>
            <a href="mailto:sayeed@exemplo.com" className="text-sm text-gray-600 hover:underline transition-all duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
