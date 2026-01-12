import Navbar from "@/components/layout/navbar/Navbar";

const FrontendLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default FrontendLayout;
