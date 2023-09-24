export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-yellow-100">
      <div className="bg-orange-200 flex flex-col items-center justify-center w-full">
        <h1 className="text-lg">Não autenticado</h1>
      </div>
      {children}
    </div>
  );
}
