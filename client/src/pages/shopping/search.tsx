import ShoppingProductCard from "@/components/shopping/ProductCard";
import { useAppSelector } from "@/store/store";
import { Loader } from "lucide-react";

const SearchPage: React.FC = () => {
  const { isLoading, searchResults } = useAppSelector(
    (state) => state.searchProduct
  );

  return (
    <div className="h-full">
      <div className="container m-auto px-4 h-full">
        {searchResults.length === 0 && (
          <div className="flex justify-center items-center w-full h-full ">
            {isLoading ? (
              <Loader className="animate-spin w-8 h-8" />
            ) : (
              <h1 className="font-semibold text-lg">Empty</h1>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {searchResults.length > 0 &&
            searchResults.map((product) => {
              return (
                <ShoppingProductCard key={Math.random()} product={product} />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
