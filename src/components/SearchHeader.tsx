
import { useState } from "react";
import { Search, X, Grid3X3, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface SearchHeaderProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

const SearchHeader = ({ initialQuery, onSearch }: SearchHeaderProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [showApps, setShowApps] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const portfolioSections = [
    { name: "Home", icon: "🏠", color: "bg-blue-500", link: "/" },
    { name: "About", icon: "ℹ️", color: "bg-blue-500", link: "/about" },
    { name: "Works", icon: "💼", color: "bg-gray-700", link: "/works" },
    { name: "Blog", icon: "📰", color: "bg-orange-500", link: "#blog" },
    { name: "Email", icon: "✉️", color: "bg-red-500", link: "mailto:sayeed@example.com" },
    { name: "GitHub", icon: "💻", color: "bg-gray-900", link: "https://github.com" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex items-center px-4 md:px-6 py-4">
        {/* Logo */}
        <button 
          onClick={() => navigate('/')}
          className="mr-6 md:mr-8 hover:opacity-80 transition-opacity duration-200"
        >
          <h1 className="text-xl md:text-2xl font-normal">
            <span className="text-blue-500">S</span>
            <span className="text-red-500">a</span>
            <span className="text-yellow-500">y</span>
            <span className="text-blue-500">e</span>
            <span className="text-green-500">e</span>
            <span className="text-red-500">d</span>
          </h1>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-4 pr-12 py-2 rounded-full focus:outline-none transition-all duration-300 ${
                isSearchFocused 
                  ? 'border-transparent ring-2 ring-blue-200 shadow-lg' 
                  : 'border border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Search..."
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Header Actions */}
        <div className="flex items-center space-x-2 md:space-x-4 ml-4 md:ml-8">
          <button 
            onClick={() => setShowApps(!showApps)}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 relative"
          >
            <Grid3X3 className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>

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
                  onClick={() => navigate('/about')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 mb-4 font-medium"
                >
                  View Another Website Design
                </button>
                
                <div className="border-t pt-4">
                  <button 
                    onClick={() => navigate('/about')}
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
                      onClick={() => navigate('/works')}
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
      </div>
    </header>
  );
};

export default SearchHeader;
