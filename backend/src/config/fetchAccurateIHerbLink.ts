import fetch from "node-fetch";

const fetchAccurateIHerbLink = async (vitaminName: string): Promise<string> => {
  const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!googleApiKey || !searchEngineId) {
    console.error("Google API key or Search Engine ID is missing");
    return "No exact product found";
  }

  const query = `site:iherb.com ${vitaminName} supplement`;
  const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&key=${googleApiKey}&cx=${searchEngineId}`;

  try {
    const response = await fetch(searchUrl);
    const data = (await response.json()) as { items?: { link: string }[] };
    return data.items?.[0]?.link || "No exact product found";
  } catch (error) {
    console.error("Error fetching iHerb link:", error);
    return "No exact product found";
  }
};

export default fetchAccurateIHerbLink;
