import fetch from "node-fetch";

export async function getDetails(graphqlSchema) {
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: graphqlSchema,
      }),
    };
  const response = await fetch(url, options);
  const data = await response.json();
  return data.data.Media;
}

export async function getCharDetails(graphqlSchema) {
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: graphqlSchema,
      }),
    };
  const response = await fetch(url, options);
  const data = await response.json();
  return data.data.Character;
}

export async function getUserDetails(graphqlSchema) {
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: graphqlSchema,
      }),
    };
  const response = await fetch(url, options);
  const data = await response.json();
  return data.data;
}

export async function getRandomQuote(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
