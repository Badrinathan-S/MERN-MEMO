import "./App.css";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import LandingPage from "./Screen/LandingPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
