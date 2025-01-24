type FilterOptionType = "Category" | "Brand";

type FilterType = {
  Category: string[];
  Brand: string[];
};

interface FatchPerameterType {
  filter: FilterType;
  sortBy: string;
}

interface CartitemType {
  productId: string;
  image: string;
  title: string;
  price: string;
  salePrice: string;
  quantity: string;
}
