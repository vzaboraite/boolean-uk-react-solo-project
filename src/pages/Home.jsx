import Collections from "./Collections";

export default function Home({ collections }) {
  return (
    <main>
      <h1>Home Page</h1>
      <Collections collections={collections} />
    </main>
  );
}
