type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  productTitle: string; // Just to search in OrderItemColumns
  color: string;
  size: string;
  quantity: number;
};

type CustomerType = {
  clerkId: string;
  name: string | null;
  email: string | null;
};
