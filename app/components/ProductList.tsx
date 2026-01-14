"use client";

import { Product } from "@/app/types";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
