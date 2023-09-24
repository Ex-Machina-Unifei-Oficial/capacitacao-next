// "use client";
// // Client Side
// import { useEffect, useState } from "react";
// import { delay } from "@/utils/funtions";

// const ExMachinaInfo = () => {
//   const [data, setData] = useState("");

//   useEffect(() => {
//     getUser();
//   }, []);

//   const getUser = async () => {
//     await delay(3000);

//     return fetch(`https://api.github.com/users/Ex-Machina-Unifei-Oficial`)
//       .then((response) => response.json())
//       .then((response) => {
//         setData(JSON.stringify(response));
//       });
//   };

//   return (
//     <div className="bg-yellow-100 w-full h-full">
//       <h1 className="font-bold text-xl">Página de informações do ex machina</h1>
//       <p>{data}</p>
//     </div>
//   );
// };

// Server Side
import { delay } from "@/utils/functions";

const ExMachinaInfo = async () => {
  const res = await fetch(
    `https://api.github.com/users/Ex-Machina-Unifei-Oficial`
  );
  const data = await res.json();

  await delay(3000);

  return (
    <>
      <h1 className="font-bold text-xl">Página de informações do ex machina</h1>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default ExMachinaInfo;
