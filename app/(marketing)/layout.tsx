import type { PropsWithChildren } from "react";

import { Footer } from "./footer";
import { Header } from "./header";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MarketingLayout;
