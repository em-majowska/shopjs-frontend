import ProductGallery from "./ProductGallery";
import ProductDetailsCart from "./ProductDetailsCart";
import fetchProduct from "@/queries/fetchProduct";
import PriceElement from "./PriceElement";

type TProductDetails = {
  params: Promise<{ id: string }>;
};

const ProductDetails = async ({ params }: TProductDetails) => {
  const { id } = await params;
  const product = await fetchProduct(id);
  const { title, description, brand, images } = product;
  return (
    <section className="fade-up flex flex-col gap-8 md:flex-row">
      <ProductGallery title={title} images={images} />
      <div className="flex flex-1 flex-col gap-8 md:justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="label text-rose-foreground">{brand}</p>
            <h1 className="font-display text-4xl font-medium md:text-5xl">
              {title}
            </h1>
            <PriceElement className="text-2xl" product={product} />
          </div>
          <p className="text-muted-foreground max-w-[65ch]">{description}</p>
        </div>
        <hr />
        <ProductDetailsCart product={product} />
      </div>
    </section>
  );
};

export default ProductDetails;
