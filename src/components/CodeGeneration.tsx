
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CodeGenerationProps {
  profileData: {
    name: string;
    profilePicture: string;
    bio: string;
  };
  links: Array<{ title: string; url: string; id: string; icon?: string }>;
  theme: string;
  primaryColor: string;
  showCredit: boolean;
  view: "code" | "copy";
}

const CodeGeneration: React.FC<CodeGenerationProps> = ({
  profileData,
  links,
  theme,
  primaryColor,
  showCredit,
  view,
}) => {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  
  // Generate code whenever props change
  useEffect(() => {
    generateCode();
  }, [profileData, links, theme, primaryColor, showCredit]);

  const generateCode = () => {
    // Define icon SVG paths
    const iconSVGs = {
      link: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
      facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
      instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`,
      twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`,
      linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
      youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>`,
      github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`,
      mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`,
      globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="2" x2="22" y1="12" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
      phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    };

    // FontAwesome Load Script 
    const fontAwesomeScript = `
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/9d05a115fd.js" crossorigin="anonymous"></script>
    `;

    // Generate HTML code
    const code = `
<!DOCTYPE html>
<html lang="en" class="${theme}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profileData.name || "My Profile"}</title>
    <meta name="description" content="${profileData.bio || "Created with LinkCraft"}">
    ${links.some(link => link.icon?.startsWith('fa:')) ? fontAwesomeScript : ''}
    <style>
        :root {
            --primary-color: ${primaryColor || "#8B5CF6"};
            --background-dark: #111827;
            --background-light: #F9FAFB;
            --card-bg-dark: rgba(30, 41, 59, 0.8);
            --card-bg-light: rgba(255, 255, 255, 0.8);
            --footer-bg-dark: rgba(30, 41, 59, 0.6);
            --footer-bg-light: rgba(255, 255, 255, 0.6);
            --text-dark: #F9FAFB;
            --text-light: #111827;
            --border-dark: rgba(255, 255, 255, 0.1);
            --border-light: rgba(0, 0, 0, 0.1);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        body {
            min-height: 100vh;
            margin: 0;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center; /* Center everything vertically */
            align-items: center; /* Center everything horizontally */
            background-color: ${theme === "dark" ? "var(--background-dark)" : "var(--background-light)"};
            color: ${theme === "dark" ? "var(--text-dark)" : "var(--text-light)"};
        }
        
        .container {
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        
        .profile-card {
            width: 100%;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8px);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: all 0.3s ease;
            animation: fadeIn 0.5s ease-out;
            position: relative;
            background-color: ${theme === "dark" ? "var(--card-bg-dark)" : "var(--card-bg-light)"};
            border: 1px solid ${theme === "dark" ? "var(--border-dark)" : "var(--border-light)"};
        }
        
        .profile-image {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 2px solid var(--primary-color);
            transition: transform 0.3s ease;
            animation: fadeIn 0.5s ease-out;
        }
        
        .profile-image:hover {
            transform: scale(1.05);
        }
        
        .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .profile-name {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
        }
        
        .profile-bio {
            text-align: center;
            margin-bottom: 1.5rem;
            max-width: 100%;
            animation: fadeIn 0.5s ease-out 0.1s both;
        }
        
        .links-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
            width: 100%;
        }
        
        .link-item {
            display: flex;
            border-radius: 0.5rem;
            overflow: hidden;
            transition: all 0.2s;
            text-decoration: none;
            color: inherit;
            animation: fadeIn 0.5s ease-out;
            animation-fill-mode: both;
            border: 1px solid ${theme === "dark" ? "var(--border-dark)" : "var(--border-light)"};
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            max-width: 100%;
        }
        
        .link-item:hover {
            transform: scale(1.03);
        }
        
        .link-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-color);
            color: white;
            min-width: 40px;
            height: 40px;
        }
        
        .link-title {
            flex: 1;
            padding: 0.5rem 0.75rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 40px;
            display: flex;
            align-items: center;
            background-color: ${theme === "dark" ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.9)"};
        }
        
        .photo-credit {
            font-size: 0.75rem;
            opacity: 0.7;
            margin-top: 1rem;
            text-align: center;
        }
        
        .page-footer {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            text-align: center;
            opacity: 0.8;
            backdrop-filter: blur(8px);
            margin-top: 1.5rem;
            background-color: ${theme === "dark" ? "var(--footer-bg-dark)" : "var(--footer-bg-light)"};
            border: 1px solid ${theme === "dark" ? "var(--border-dark)" : "var(--border-light)"};
        }
        
        .footer {
            width: 100%;
        }
        
        .footer a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Apply animation delay to links */
        ${links.map((_, index) => `.link-item:nth-child(${index + 1}) { animation-delay: ${0.2 + index * 0.1}s; }`).join('\n')}
        
        /* RTL support for directional elements */
        [dir="rtl"] .link-icon {
            order: 2;
        }
        
        [dir="rtl"] .link-title {
            order: 1;
        }
        
        .first-letter {
            font-weight: bold;
            font-size: 1.1em;
        }
        
        @media (max-width: 640px) {
            .container {
                padding: 1rem 0.5rem;
            }
            
            .profile-card {
                padding: 1.25rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="profile-card">
            ${
              profileData.profilePicture
                ? `<div class="profile-image">
                    <img 
                        src="${profileData.profilePicture}" 
                        alt="${profileData.name || "Profile"}" 
                        onerror="this.src='https://via.placeholder.com/150?text=Profile'"
                    />
                </div>`
                : ""
            }
            <h1 class="profile-name">${profileData.name || "Your Name"}</h1>
            <p class="profile-bio">${profileData.bio || ""}</p>

            <div class="links-container">
                ${links
                  .map((link, index) => {
                    // Function to handle FontAwesome icons
                    const renderFontAwesomeIcon = () => {
                      if (!link.icon || !link.icon.startsWith('fa:')) return '';
                      
                      const faClass = link.icon.replace('fa:', '');
                      if (!faClass) return '';
                      
                      // Parse FontAwesome class to get prefix and icon name
                      const parts = faClass.split(' ');
                      let prefix = 'fas'; // Default to solid
                      let iconName = parts[0];
                      
                      if (parts.length > 1) {
                        if (parts[0] === 'brands' || parts[0] === 'brand') {
                          prefix = 'fab';
                          iconName = parts[1].replace('fa-', '');
                        } else {
                          prefix = parts[0] === 'solid' ? 'fas' : prefix;
                          iconName = parts[1].replace('fa-', '');
                        }
                      }
                      
                      return `<i class="${prefix} fa-${iconName}"></i>`;
                    };
                    
                    // Generate the icon HTML based on the link's icon type
                    const iconHtml = link.icon?.startsWith('fa:') 
                      ? renderFontAwesomeIcon()
                      : (iconSVGs[link.icon as keyof typeof iconSVGs] || 
                         (link.title ? `<div class="first-letter">${link.title.charAt(0).toUpperCase()}</div>` : iconSVGs.link));
                    
                    return `
                    <a 
                        href="${link.url}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="link-item"
                    >
                        <div class="link-icon">
                            ${iconHtml}
                        </div>
                        <div class="link-title">
                            <span>${link.title || "Untitled"}</span>
                        </div>
                    </a>`;
                  })
                  .join("")}
            </div>

        </div>
        
        ${showCredit ? `
        <div class="page-footer footer">
            Created with <a href="https://linkcraft.qomarhsn.com" target="_blank" rel="noopener noreferrer">LinkCraft</a>
        </div>
        ` : ''}
    </div>
</body>
</html>
    `.trim();

    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    if (!generatedCode) {
      toast.error("Nothing to copy! Generate code first.");
      return;
    }

    navigator.clipboard.writeText(generatedCode).then(
      () => {
        setCopied(true);
        toast.success("Code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        toast.error("Failed to copy code to clipboard.");
        console.error("Could not copy text: ", err);
      }
    );
  };

  // When "copy" view is active, automatically try to copy
  useEffect(() => {
    if (view === "copy" && generatedCode) {
      copyToClipboard();
    }
  }, [view, generatedCode]);

  return (
    <div className="space-y-4">
      {view === "code" && (
        <>
          <div className="relative">
            <Textarea
              value={generatedCode}
              readOnly
              className="h-[400px] font-mono text-sm p-4 bg-background border-primary/10"
            />
            <Button
              onClick={copyToClipboard}
              className="absolute top-3 right-3"
              variant="outline"
              size="icon"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="bg-muted rounded-md p-4 border border-primary/10">
            <h3 className="font-medium mb-2">How to use this code:</h3>
            <ol className="list-decimal ml-4 space-y-2 text-sm text-muted-foreground">
              <li>Copy the code above using the copy button.</li>
              <li>Create a new file and paste the code into it.</li>
              <li>Save the file with a .html extension (e.g., mylinks.html).</li>
              <li>Upload this file to any static hosting service like GitHub Pages, Netlify, or Vercel.</li>
            </ol>
          </div>
        </>
      )}
      
      {view === "copy" && (
        <div className="flex flex-col items-center justify-center h-[400px] bg-muted rounded-lg border border-primary/10">
          <Button 
            onClick={copyToClipboard} 
            size="lg" 
            className="mb-4 gap-2"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? "Copied!" : "Copy Code"} 
          </Button>
          <p className="text-center text-muted-foreground max-w-md px-4">
            The HTML code has been generated. Click the button above to copy it to your clipboard.
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeGeneration;
