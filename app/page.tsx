import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

async function Home() {
  const allProducts = await getAllProducts();

  return (
    <div>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small_text group cursor-pointer">
              Smart Shopping Starts Here :
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Arrow Right"
                width={18}
                height={18}
                className="transition-all group-hover:translate-x-1"
              />
            </p>

            <h1 className="head_text">
              Unleash the power of{" "}
              <span className="text-primary">MarketGoods</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <SearchBar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending_section">
        <h2 className="section_text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
