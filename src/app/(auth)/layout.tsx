export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-cda-blue-900">
      <div className="w-1/2h-[100vh] bg-[url('/hero-bg.png')]"></div>
      <div className="w-1/2 h-[100vh]"></div>
    </div>
  );
}
