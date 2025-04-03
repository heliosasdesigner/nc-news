import ContentCard from "./ContentCard";
import ContentList from "./ContentList";

function Container() {
  return (
    <main>
      <section>
        <ContentCard />
      </section>
      <section>
        <ContentList />
      </section>
    </main>
  );
}

export default Container;
