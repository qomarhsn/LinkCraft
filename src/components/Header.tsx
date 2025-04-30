
import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="w-full max-w-5xl mx-auto mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
            <LinkIcon className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            LinkCraft
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1 border border-border/50">
            <Switch
              checked={theme === "light"}
              onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent"
            />
            <span className="text-xs text-muted-foreground">{theme === "light" ? "Light" : "Dark"}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center max-w-lg mx-auto">
        <p className="text-sm text-muted-foreground">
          Create your personalized link page in minutes
        </p>
      </div>
    </header>
  );
};

export default Header;
