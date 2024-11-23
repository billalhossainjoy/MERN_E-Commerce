import { Button } from "@/components/ui/button";
import banner1 from "/banner/banner1.jpg";
import banner2 from "/banner/banner2.jpg";
import banner3 from "/banner/banner3.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  brandsWithIcon,
  categoriesWithIcon,
} from "@/components/admin/constants";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchShoppingProducts } from "@/store/features/shopping/product.slice";
import ShoppingProductCard from "@/components/shopping/ProductCard";
import { useNavigate } from "react-router-dom";

const ShoppingHome: React.FC = () => {
  const { ProductLists } = useAppSelector((state) => state.shoppingProduct);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = useMemo(() => [banner1, banner2, banner3], []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((current) =>
      current == banners.length - 1 ? 0 : current + 1
    );
  }, [banners]);
  const prevSlide = () => {
    setCurrentSlide((current) =>
      current == 0 ? banners.length - 1 : current - 1
    );
  };

  const handleNavigateFilter = (filter: string, type: "Category" | "Brand") => {
    sessionStorage.removeItem("Filters");
    const currentFilter = {
      Category: type == "Category" ? [filter] : [],
      Brand: type == "Brand" ? [filter] : [],
    };
    console.log(currentFilter);
    sessionStorage.setItem("Filters", JSON.stringify(currentFilter));
    navigate("/shopping/listing");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    dispatch(
      fetchShoppingProducts({ filter: { Category: [], Brand: [] }, sortBy: "" })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {banners.map((banner, index) => (
          <img
            src={banner}
            alt="Hero section"
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 bottom-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          className="absolute top-1/2 rounded-lg mx-5"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="w-4 h-4 " />
        </Button>
        <Button
          className="absolute top-1/2 rounded-lg mx-5 right-0 "
          onClick={nextSlide}
        >
          <ChevronRightIcon className="w-4 h-4 " />
        </Button>

        <div className="absolute bottom-5 right-1/2 ">
          <div className="flex  gap-1">
            {banners.map((_, index) => (
              <span
                key={index}
                className={`bg-gray-400 rounded-full flex w-3 h-3 ${
                  index == currentSlide && "bg-purple-700"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((category,index) => (
              <Card
                key={index}
                onClick={() => handleNavigateFilter(category.id, "Category")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 h-1/2 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((category,index) => (
              <Card
                key={index}
                onClick={() => handleNavigateFilter(category.id, "Brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 h-1/2 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 ">
        <div className="container m-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h1>
          <div className="w-full p-3 overflow-y-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {ProductLists.length > 0 &&
                ProductLists.map((product) => {
                  return (
                    <ShoppingProductCard
                      key={Math.random()}
                      product={product}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ShoppingHome;
