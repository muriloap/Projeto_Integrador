import { ChangeEvent, useState } from "react";
import SelectProduct from "../SelectProduct";
import styles from "./styles.module.css";
import Product from "@/models/product";
import TxtField from "../TxtField";

type Props = {
    product: Product[];
    onChange?(data: { productId: string; quantity: string }): void;
};

export default function SelectProductList({ product, onChange }: Props) {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState("");

    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        const newProduct = e.target.value;
        setSelectedProduct(newProduct);
        onChange?.({ productId: newProduct, quantity });
    }

    function handleQuantityChange(value: string) {
        setQuantity(value);
        onChange?.({ productId: selectedProduct, quantity: value });
    }

    return (
        <>
            <select className={styles.formSelect} onChange={handleSelectChange}>
                <option value="">Selecione um Produto</option>
                {product.map((product) => (
                    <SelectProduct key={product.id} product={product} />
                ))}
            </select>

            <TxtField value={quantity} label="Quantidade" type="text" onChange={handleQuantityChange}
            />
        </>
    );
}
