import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="font-bold text-xl">
        Página do produto: {router.query.id}
      </h1>
    </>
  );
};

export default Product;
