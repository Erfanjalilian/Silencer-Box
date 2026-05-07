import Hero from "./components/Hero";
import Articles from "./components/Articles";
import BestSellingProducts from "./components/BestSellingProducts";
export default function Home() {
  return (
    <div>
      <Hero/>
      <Articles/>
      <BestSellingProducts/>
    </div>
  );
}
