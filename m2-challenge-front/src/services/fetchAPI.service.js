const DB_URL =
  "https://my-json-server.typicode.com/jvitorsouza18/m2-challenge/db";

export default async function fetchAPI() {
  const request = await fetch(DB_URL);
  const data = await request.json();

  return data.plans;
}

fetchAPI();
