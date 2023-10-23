import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type ProductDetailsProps = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: ProductDetailsProps) => {
  const product: Product = await getProductById(id);
  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product_container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product_image">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start flex-wrap gap-5 pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-primary-orange"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product_hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="Heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#d46f77]">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="Bookmark"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="Share"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="product_info">
            <div className="flex flex-col gap-3">
              <p className="text-[32px] text-secondary font-bold">
                <span className="text-green-600">{product.currency}</span>{" "}
                {formatNumber(product.currentPrice)}
              </p>

              <p className="text-[21px] text-secondary opacity-50 font-bold line-through">
                <span className="text-green-600">{product.currency}</span>{" "}
                {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="product_stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="Star"
                    width={18}
                    height={18}
                  />

                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || "32"}
                  </p>
                </div>

                <div className="product_reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="Comment"
                    width={18}
                    height={18}
                  />

                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">90%</span> of
                buyers have recommended this.
              </p>
            </div>
          </div>

          <div className="my-8 flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />

              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />

              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />

              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>

          <Modal productId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl text-secondary font-semibold">
            Product Description
          </h2>

          <div className="flex flex-col gap-5">
            {product?.description?.split("\n")}
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image src="/assets/icons/bag.svg" alt="Bag" width={23} height={23} />

          <Link href={product.url} className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-3 w-full">
          <p className="section_text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-8 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
