
import SearchHeader from "@/components/SearchHeader";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";

const About = () => {
  const [searchQuery, setSearchQuery] = useState("about");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader 
        initialQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      <div className="py-6">
        <SearchResults 
          query={searchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default About;
