import Header from "./components/Header";
import Container from "./components/Container";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container dark:text-3xl light:text-xl font-bold underline">
      <Header />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
