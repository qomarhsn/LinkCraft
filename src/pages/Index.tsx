
import React, { useState, useEffect } from "react";
import FormSection from "@/components/FormSection";
import PreviewSection from "@/components/PreviewSection";
import CodeGeneration from "@/components/CodeGeneration";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    profilePicture: "",
    bio: "",
  });
  const [links, setLinks] = useState<Array<{ title: string; url: string; id: string; icon: string }>>(
    []
  );
  const [theme, setTheme] = useState("dark"); // Default to dark mode
  const [primaryColor, setPrimaryColor] = useState("#8B5CF6"); // Default purple color
  const [activeTab, setActiveTab] = useState("preview");
  const [showCredit, setShowCredit] = useState(false); // Default to not showing credit

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("linkcraft-data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setProfileData(parsedData.profileData || {
          name: "",
          profilePicture: "",
          bio: "",
        });
        setLinks(parsedData.links || []);
        setTheme(parsedData.theme || "dark");
        setPrimaryColor(parsedData.primaryColor || "#8B5CF6");
        setShowCredit(parsedData.showCredit || false);
      } catch (error) {
        console.error("Error loading saved data:", error);
        toast.error("Failed to load your saved data.");
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = {
      profileData,
      links,
      theme,
      primaryColor,
      showCredit,
    };
    
    localStorage.setItem("linkcraft-data", JSON.stringify(dataToSave));
  }, [profileData, links, theme, primaryColor, showCredit]);

  // Handle clear data function
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all your data? This action cannot be undone.")) {
      setProfileData({
        name: "",
        profilePicture: "",
        bio: "",
      });
      setLinks([]);
      toast.success("All data has been cleared.");
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="linkcraft-theme">
      <div className="container mx-auto py-6 px-4 flex flex-col items-center min-h-screen">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mb-8">
          <div className="space-y-4">
            <FormSection
              profileData={profileData}
              links={links}
              theme={theme}
              primaryColor={primaryColor}
              showCredit={showCredit}
              setProfileData={setProfileData}
              setLinks={setLinks}
              setTheme={setTheme}
              setPrimaryColor={setPrimaryColor}
              setShowCredit={setShowCredit}
            />
            
            <div className="flex justify-end">
              <button
                onClick={handleClearData}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Reset All Data
              </button>
            </div>
          </div>
          
          <div>
            <Card className="border-primary/10">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Preview & Code</h2>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">View Code</TabsTrigger>
                    <TabsTrigger value="copy">Copy Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="preview" className="mt-0">
                    <PreviewSection
                      profileData={profileData}
                      links={links}
                      theme={theme}
                      primaryColor={primaryColor}
                      showCredit={showCredit}
                    />
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-0">
                    <CodeGeneration
                      profileData={profileData}
                      links={links}
                      theme={theme}
                      primaryColor={primaryColor}
                      showCredit={showCredit}
                      view="code"
                    />
                  </TabsContent>
                  
                  <TabsContent value="copy" className="mt-0">
                    <CodeGeneration
                      profileData={profileData}
                      links={links}
                      theme={theme}
                      primaryColor={primaryColor}
                      showCredit={showCredit}
                      view="copy"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>
    &copy; {new Date().getFullYear()} LinkCraft. Coded by AI, prompted by{" "}
    <a href="https://qomarhsn.com" className="hover:text-primary">Qomarul Hasan</a>
  </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
