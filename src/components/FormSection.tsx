
import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Import just the essential icons
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  Mail,
  Globe,
  Github,
  Link as LinkIcon,
  Phone
} from "lucide-react";

interface FormSectionProps {
  profileData: {
    name: string;
    profilePicture: string;
    bio: string;
  };
  links: Array<{ title: string; url: string; id: string; icon: string }>;
  theme: string;
  primaryColor: string;
  showCredit: boolean;
  setProfileData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      profilePicture: string;
      bio: string;
    }>
  >;
  setLinks: React.Dispatch<
    React.SetStateAction<Array<{ title: string; url: string; id: string; icon: string }>>
  >;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
  setShowCredit: React.Dispatch<React.SetStateAction<boolean>>;
}

// Simplified social icons list
const socialIcons = [
  { value: "none", label: "No Icon", icon: null },
  { value: "link", label: "Generic Link", icon: LinkIcon },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "github", label: "GitHub", icon: Github },
  { value: "mail", label: "Email", icon: Mail },
  { value: "globe", label: "Website", icon: Globe },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "custom", label: "Custom FontAwesome Icon", icon: null },
];

// Predefined color options
const colorOptions = [
  { label: "Purple", value: "#8B5CF6" },
  { label: "Blue", value: "#3B82F6" },
  { label: "Pink", value: "#EC4899" },
  { label: "Green", value: "#10B981" },
  { label: "Orange", value: "#F97316" },
  { label: "Red", value: "#EF4444" },
  { label: "Teal", value: "#14B8A6" },
  { label: "Yellow", value: "#F59E0B" },
  { label: "Indigo", value: "#6366F1" },
];

const FormSection: React.FC<FormSectionProps> = ({
  profileData,
  links,
  theme,
  primaryColor,
  showCredit,
  setProfileData,
  setLinks,
  setTheme,
  setPrimaryColor,
  setShowCredit,
}) => {
  

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "title" | "url" | "customIcon"
  ) => {
    const newLinks = [...links];
    if (field === "customIcon") {
      // Store the FontAwesome class name
      newLinks[index].icon = `fa:${e.target.value}`;
    } else {
      newLinks[index][field] = e.target.value;
    }
    setLinks(newLinks);
  };

  const handleIconChange = (value: string, index: number) => {
    const newLinks = [...links];
    // Reset custom icon field if not selecting "custom"
    if (value !== "custom" && newLinks[index].icon?.startsWith("fa:")) {
      newLinks[index].icon = value;
    } else if (value === "custom") {
      // Initialize with fa: prefix but empty class
      if (!newLinks[index].icon?.startsWith("fa:")) {
        newLinks[index].icon = "fa:";
      }
    } else {
      newLinks[index].icon = value;
    }
    setLinks(newLinks);
  };

  const addNewLink = () => {
    setLinks([...links, { title: "", url: "", id: crypto.randomUUID(), icon: "link" }]);
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
  };

  const isCustomIcon = (icon: string) => icon?.startsWith("fa:");
  const getCustomIconClass = (icon: string) => icon?.replace("fa:", "") || "";

  return (
    <div className="space-y-6 w-full">
      <Card className="border-primary/10">
        <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Your name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                value={profileData.profilePicture}
                onChange={handleProfileChange}
                placeholder="https://example.com/your-image.jpg"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                placeholder="A short description about yourself"
                className="resize-none min-h-[100px] mt-1"
              />
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/2">
                <Label>Theme</Label>
                <div className="flex items-center justify-between mt-1.5 bg-muted/50 rounded-md p-2">
                  <span className="text-sm text-muted-foreground">Dark</span>
                  <Switch
                    checked={theme === "light"}
                    onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
                  />
                  <span className="text-sm text-muted-foreground">Light</span>
                </div>
              </div>
              
              <div className="w-full sm:w-1/2">
                <Label>Primary Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full mt-1.5 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: primaryColor }}
                        />
                        <span>
                          {colorOptions.find(c => c.value === primaryColor)?.label || "Custom"}
                        </span>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid grid-cols-3 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          className="rounded-md p-2 relative flex items-center justify-center"
                          onClick={() => handleColorChange(color.value)}
                          style={{ backgroundColor: color.value }}
                        >
                          {primaryColor === color.value && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Label htmlFor="customColor">Custom Color</Label>
                      <Input
                        id="customColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="mt-1 h-10 cursor-pointer"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Credit option without position selection */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="showCredit" className="cursor-pointer">Show LinkCraft Credit</Label>
                <Switch
                  id="showCredit"
                  checked={showCredit}
                  onCheckedChange={setShowCredit}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/10">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Links</h2>
            <Button onClick={addNewLink} variant="outline" className="hover:bg-primary/10">Add Link</Button>
          </div>
          <div className="space-y-4">
            {links.map((link, index) => (
              <div key={link.id} className="space-y-4 border rounded-md p-4 relative border-primary/10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => removeLink(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                
                <div>
                  <Label htmlFor={`icon-${index}`}>Icon</Label>
                  <Select 
                    value={isCustomIcon(link.icon) ? "custom" : link.icon || "link"} 
                    onValueChange={(value) => handleIconChange(value, index)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {socialIcons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value} className="flex items-center space-x-2">
                          <span className="flex items-center">
                            {icon.icon && <icon.icon className="mr-2 h-4 w-4" />}
                            {icon.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Show custom icon input if "Custom FontAwesome Icon" is selected */}
                {isCustomIcon(link.icon) && (
                  <div>
                    <Label htmlFor={`customIcon-${index}`}>FontAwesome Class</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">fa-</span>
                      <Input
                        id={`customIcon-${index}`}
                        value={getCustomIconClass(link.icon)}
                        onChange={(e) => handleLinkChange(e, index, "customIcon")}
                        placeholder="brands fa-telegram"
                        className="mt-1 flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Example: "brands fa-telegram" or "solid fa-home"
                    </p>
                  </div>
                )}
                
                <div>
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={link.title}
                    onChange={(e) => handleLinkChange(e, index, "title")}
                    placeholder="My Website"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`url-${index}`}>URL</Label>
                  <Input
                    id={`url-${index}`}
                    value={link.url}
                    onChange={(e) => handleLinkChange(e, index, "url")}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            ))}
            {links.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No links added yet. Click "Add Link" to add your first link.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSection;
