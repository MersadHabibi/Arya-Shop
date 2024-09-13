import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Profits from "@/components/layout/profits";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="ss02 relative flex min-h-svh flex-col">
      <Header />

      {children}

      <Footer />
    </main>
  );
};

export default Layout;
