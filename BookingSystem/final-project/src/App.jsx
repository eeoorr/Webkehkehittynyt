import Header from "./components/Header.jsx"
import Hero from "./components/Hero.jsx"
import ProductCard from "./components/ProductCard.jsx"
import Footer from "./components/Footer.jsx"

function App() {
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
  )
}

export default App
