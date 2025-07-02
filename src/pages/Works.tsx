
import SearchHeader from "@/components/SearchHeader";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Works = () => {
  const [searchQuery, setSearchQuery] = useState("works");

  const projects = [
    {
      title: "TutCode - site to simultaneously view tutorials and code",
      url: "https://github.com/sayeed/TutCode",
      description: "A website where people can simultaneously code and watch/read tutorials. It's a more convenient way to learn and practice how to code (with HTML, CSS and JavaScript) on the same page",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      tags: ["JavaScript", "HTML", "CSS", "Education"],
    },
    {
      title: "Portfolio Website (this website)",
      url: "https://sayeed.dev",
      description: "A personal website simulating the Google Search platform. Developed with HTML, CSS and React",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Personal Website",
      url: "https://sayeed.com",
      description: "My personal website, designed and developed from scratch. It features a lot of hover effects, custom styling and a blog.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      tags: ["React", "CSS", "Blog", "Design"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader 
        initialQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-4">
            About {projects.length} results (0.43 seconds)
          </div>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group">
              <div className="overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 hover:underline cursor-pointer transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors duration-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button 
                    size="sm" 
                    className="flex items-center justify-center space-x-1 transition-all duration-200 hover:shadow-md flex-1"
                    onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center justify-center space-x-1 transition-all duration-200 hover:shadow-md flex-1"
                    onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                  >
                    <Github className="w-3 h-3" />
                    <span>Code</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
