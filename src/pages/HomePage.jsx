import FeaturedProducts from "../components/FeatureProducts";
import ProductGrid from "../components/ProductGrid";
import Services from "../components/Services";
import SlideShow from "../components/SlideShow";
import RatingCustomer from "../components/RatingCustomer";


const HomePage = () => {
    return(
        <div>
            <SlideShow></SlideShow>
            <FeaturedProducts></FeaturedProducts>
            <Services></Services>
            <ProductGrid></ProductGrid>
            <RatingCustomer></RatingCustomer>
        </div>
    )
}

export default HomePage;