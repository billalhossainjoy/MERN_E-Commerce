export const shoppingHeaderMenu = [
  {
    id: "home",
    label: "Home",
    path: "/shopping",
  },
  {
    id: "men",
    label: "Men",
    path: "/shopping/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shopping/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shopping/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shopping/listing",
  },
];

export const defaultFilterOptions = {
  Category: [],
  Brand: [],
};

export const filterOptions = {
  Category: [
    {
      id: "men",
      label: "Men",
    },
    {
      id: "women",
      label: "Women",
    },
    {
      id: "kids",
      label: "Kids",
    },
    {
      id: "accessories",
      label: "Accessories",
    },
    {
      id: "footwear",
      label: "Footwear",
    },
    {
      id: "others",
      label: "Others",
    },
  ],
  Brand: [
    {
      id: "nike",
      label: "Nike",
    },
    {
      id: "adidas",
      label: "Adidas",
    },
    {
      id: "puma",
      label: "Puma",
    },
    {
      id: "levi",
      label: "Levi's",
    },
    {
      id: "zara",
      label: "Zara",
    },
    {
      id: "h&m",
      label: "H&M",
    },
    {
      id: "others",
      label: "Others",
    },
  ],
};

export const sortOptions = [
  { id: "default", label: "Default" },
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export type productDetailsType =
 "Product ID"
  | "special price"
  | "product price"
  | "Stock Status"
  | "Brand"
  | "Warranty";
export const productDetails = {
  "Product ID": "_id",
  "special price": "price",
  "product price": "salePrice",
  "Stock Status": "totalStack",
  Brand: "brand",
  Warranty: "No Warranty",
};
