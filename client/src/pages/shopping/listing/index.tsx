import CustomButton from "@/components/common/CustomButton";
import {
  defaultFilterOptions,
  sortOptions,
} from "@/components/shopping/constants";
import ProductsFilter from "@/components/shopping/Filter";
import ShoppingProductCard from "@/components/shopping/ProductCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchShoppingProducts } from "@/store/features/shopping/product.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ShoppingListing: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [sortProduct, setSortProduct] = useState("default");
  const [filterProducts, setFilterProducts] =
    useState<FilterType>(defaultFilterOptions);
  const [searchParams, setSearchParams] = useSearchParams();

  const { ProductLists } = useAppSelector((state) => state.shoppingProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ready)
      dispatch(
        fetchShoppingProducts({ filter: filterProducts, sortBy: sortProduct })
      );
  }, [dispatch, sortProduct, filterProducts, ready]);

  useEffect(() => {
    const filters = JSON.parse(
      sessionStorage.getItem("Filters") ?? JSON.stringify(defaultFilterOptions)
    );
    setFilterProducts(filters);
    setReady(true);
  }, [searchParams]);

  useEffect(() => {
    const searchFilters = Object.keys(filterProducts);
    if (filterProducts && searchFilters.length > 0) {
      searchFilters.forEach((option) => {
        const key = filterProducts[option as FilterOptionType].join(",");
        searchParams.set(option.toLowerCase(), key);
      });
      setSearchParams(searchParams);
    }
  }, [filterProducts, searchParams, setSearchParams])

  return (
    <div className=" bg-white grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 h-auto">
      <ProductsFilter
        filterProducts={filterProducts}
        setFilterProducts={setFilterProducts}
      />
      <div className=" w-full rounded-lg shadow-sm flex flex-col gap-6">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {ProductLists.length} Products
            </span>{" "}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CustomButton variant="outline" className="flex gap-2">
                  <ArrowUpDown className="w-5 h-5" />
                  <span>Sort By</span>
                </CustomButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sortProduct}
                  onValueChange={setSortProduct}
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="w-full p-3 overflow-y-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {ProductLists.length > 0 &&
              ProductLists.map((product) => {
                return (
                  <ShoppingProductCard key={Math.random()} product={product} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingListing;
