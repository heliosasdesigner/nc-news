import ContentCard from "./articles/ContentCard";
import ContentList from "./articles/ContentList";

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
