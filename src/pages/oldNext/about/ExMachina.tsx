import { delay } from "@/utils/functions";
// Client Side
import { useEffect, useState } from "react";

const ExMachinaInfo = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await delay(3000);

    return fetch(`https://api.github.com/users/Ex-Machina-Unifei-Oficial`)
      .then((response) => response.json())
      .then((response) => {
        setData(JSON.stringify(response));
      });
  };

  return (
    <div className="bg-yellow-100 w-full h-full">
      <h1 className="font-bold text-xl">Página de informações do ex machina</h1>
      <p>{data}</p>
    </div>
  );
};

// Server Side
// type ExMachinaInfoProps = {
//   data: string;
// };

// export async function getServerSideProps() {
//   const res = await fetch(
//     `https://api.github.com/users/Ex-Machina-Unifei-Oficial`
//   );
//   const data = await res.json();

//   await delay(3000);

//   return { props: { data: JSON.stringify(data) } };
// }

// const ExMachinaInfo = ({ data }: ExMachinaInfoProps) => {
//   return (
//     <div className="bg-yellow-100 w-full h-full">
//       <h1 className="font-bold text-xl">Página de informações do ex machina</h1>
//       <p>{data}</p>
//     </div>
//   );
// };

export default ExMachinaInfo;
