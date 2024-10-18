import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
