import Profits from "@/components/layout/profits";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="mt-24 hidden lg:block">
        <Profits />
      </div>
    </>
  );
}
