export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-cda-blue-900">
      {children}
    </div>
  );
}
