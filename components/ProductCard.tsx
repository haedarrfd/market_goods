import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product._id}`} className="product_card">
      <div className="product_card_img_container">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="product_card_img"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="product_title">{product.title}</h2>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product.category}
          </p>

          <p className="text-black text-lg font-semibold">
            <span className="text-green-600">{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
