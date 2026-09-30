import { mkdir, writeFile } from "node:fs/promises";
import { productImageName } from "../src/lib/slug.ts";

const response = await fetch("https://fakestoreapi.com/products");

if (!response.ok) {
  throw new Error(`Could not download the catalog (${response.status})`);
}

const products = await response.json();
const directory = new URL("../public/images/products/", import.meta.url);
await mkdir(directory, { recursive: true });

for (const product of products) {
  const imageResponse = await fetch(product.image);
  if (!imageResponse.ok) {
    throw new Error(`Could not download ${product.image}`);
  }
  const fileName = productImageName(product.title, product.id, product.image);
  await writeFile(
    new URL(fileName, directory),
    Buffer.from(await imageResponse.arrayBuffer()),
  );
  console.log(fileName);
}
