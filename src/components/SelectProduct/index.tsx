import Product from "@/models/product";

type Props = {
  product: Product;
};

export default function SelectProduct({ product }: Props) {
  return (
    <>
    <option value={product.id}>{product.name}</option>
    </>
  );
}
