type UserProps = {
  params: { id: string };
};

const User = async ({ params }: UserProps) => {
  const res = await fetch(`https://api.github.com/users/${params.id}`);
  const data = await res.json();

  return (
    <>
      <h1 className="font-bold text-xl">Página do usuário: </h1>
      <h2>
        Nome: {data.login} | id: {data.id}
      </h2>
      <h2>Criado em: {data.created_at}</h2>
      <h2>Repositórios Públicos: {data.public_repos}</h2>
    </>
  );
};

export default User;
