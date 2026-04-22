import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Footer from "./components/Footer.jsx";
import FormPage from "./pages/FormPage.jsx";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />

      <main>
        <section className="product-section">
          <ProductCard
            title="SSSS6000"
            image="snowshovel2.jpg"
            summary="The Super Snow Shine Shovel 6000™-model brings the best out of the snow shovels! Its shininess brings shame upon your neighbours as they have to avert their envious eyes from your shiny shovel!"
            link="article2.html"
          />

          <ProductCard
            title="SSSSX6000"
            image="snowshovel.jpg"
            summary="The Super Snow Shine Shovel Xtreme 6000™-model is the best of the best snow shovels ever created. Its unparalleled snow clearing powers are no match for even the most solid frost snows."
            link="article1.html"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
