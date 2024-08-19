export function generateProjectAbbreviation(name) {
    // Remove leading/trailing spaces and split the project name into words
    const words = name.trim().split(/\s+/);
  
    // Take the first letter of each word and join them
    let abbreviation = words.map(word => word.charAt(0).toUpperCase()).join('');
  
    // Ensure the abbreviation has at least 3 characters
    if (abbreviation.length < 3) {
      // If it's too short, keep adding characters from the project name
      const extraLetters = name.replace(/\s+/g, '').slice(abbreviation.length, 3).toUpperCase();
      abbreviation += extraLetters;
    }
  
    // Limit the abbreviation to a maximum of 3 characters
    return abbreviation.slice(0, 3);
  }
  