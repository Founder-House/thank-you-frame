export default function spliceNameAndText(inputText: string): {
  username: string | null;
  text: string;
} {
  // Regular expression to match the username pattern
  const usernamePattern = /@([a-zA-Z0-9._-]+)\b/;
  const match = inputText.match(usernamePattern);

  // Check if we found a username
  if (match) {
    const username = match[0]; // Includes the @ symbol
    // Remove the username from the text to get the remaining message
    const textWithoutUsername = inputText.replace(usernamePattern, "").trim();

    return {
      username: username.substring(1), // Remove the @ symbol before returning
      text: textWithoutUsername,
    };
  } else {
    // Return the original text if no username is found
    return {username: null, text: inputText};
  }
}
