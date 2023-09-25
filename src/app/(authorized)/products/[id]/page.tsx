type ProductProps = {
  params: { id: string };
};

const Product = ({ params }: ProductProps) => {
  return (
    <>
      <h1 className="font-bold text-xl">Página do produto: {params.id}</h1>
    </>
  );
};

export default Product;
