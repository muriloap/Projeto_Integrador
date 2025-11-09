import { ChangeEvent, useState } from "react";
import SelectProduct from "../SelectProduct";
import styles from "./styles.module.css";
import Product from "@/models/product";

type Props = {
  product: Product[];
  value?: string | number;
  onChange?(texto: string): void;
}

export default function SelectProductList({ product, onChange, value }: Props) {

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange?.(e.target.value);
  }

  return (
    <>
      <select className={styles.formSelect} value={value} onChange={handleSelectChange}>
        <option value="">Selecione um Produto</option>
        {product.map((product) => (
          <SelectProduct key={product.id} product={product} />
        ))}
      </select>

    </>
  );
}
