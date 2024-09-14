import { createClient } from "contentful";

export const createContentClient = () => {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
};
const client = createContentClient();

export const getEntriesByType = async (type) => {
  const response = await client.getEntries({
    content_type: type,
  });

  return response.items;
};

export const getBlogs = async () => {
  const results = await getEntriesByType("blog");
  const blogPosts = results.map((blog) => blog);
  return blogPosts;
};

export const getFaq = async () => {
  const results = await getEntriesByType("faq");
  const faq = results.map((i) => i.fields);
  return faq;
};

export const getGames = async () => {
  const results = await getEntriesByType("games");
  const games = results.map((game) => game.fields);
  return games;
};

export const getCasinos = async () => {
  const results = await getEntriesByType("casino");
  const casinos = results.map((casino) => casino.fields);
  return casinos;
};

export const getBonuses = async () => {
  const results = await getEntriesByType("bonuses");
  const bonuses = results.map((bonus) => bonus.fields);
  return bonuses;
};

// Default export React component
const DefaultComponent = () => {
  return (
    <div>
      <h1>Welcome to the Contentful Data Fetcher</h1>
      <p>This component serves as a placeholder or a default export for your module.</p>
    </div>
  );
};

export default DefaultComponent;
