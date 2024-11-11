"use client";

import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productsDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("[collectionId_GET]", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // return <div>hello</div>
  return loading ? <Loader /> : <ProductForm initialData={productsDetails} />;
};

export default ProductDetails;
