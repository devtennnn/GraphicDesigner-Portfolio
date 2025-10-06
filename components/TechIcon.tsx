import React from 'react';

const TechIcon: React.FC<{ tech: string }> = ({ tech }) => {
  const formattedTech = tech.toLowerCase().trim();
  const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${formattedTech}/${formattedTech}-original.svg`;
  const plainIconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${formattedTech}/${formattedTech}-plain.svg`;
  
  // Some icons only have a "plain" version
  const handleIconError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = plainIconUrl;
    e.currentTarget.onerror = null; // Prevent infinite loop if plain also fails
  };

  return (
    <img 
      src={iconUrl} 
      alt={`${tech} icon`} 
      className="h-6 w-6" 
      title={tech.charAt(0).toUpperCase() + tech.slice(1)}
      onError={handleIconError}
    />
  );
};

export default TechIcon;
