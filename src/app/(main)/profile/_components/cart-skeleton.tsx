const CartSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-3 px-5 lg:grid lg:grid-cols-[1fr_340px] lg:px-20">
      <div className="flex w-full flex-col gap-24">
        <div className="flex w-full flex-col gap-6">
          <span className="relative hidden w-fit bg-primary p-4 text-center text-[40px] font-bold leading-tight text-white max-lg:w-full max-lg:rounded-xl lg:block lg:rounded-e-2xl lg:px-16 lg:py-3">
            <span className="absolute inset-y-0 end-full w-svw bg-primary" />
            سبد خرید شما
          </span>

          <div className="flex flex-col gap-3">
            <div className="flex h-48 w-full animate-pulse rounded-2xl bg-base-200 lg:h-64"></div>
            <div className="flex h-48 w-full animate-pulse rounded-2xl bg-base-200 lg:h-64"></div>
          </div>
        </div>
      </div>

      <div className="relative block max-lg:mb-12">
        <div className="sticky top-[calc(var(--header-height)_+_12px)] flex h-fit flex-col gap-6 rounded-2xl border border-base-200 p-4">
          <span className="h-4 w-full animate-pulse rounded bg-base-200" />

          <span className="h-4 w-full animate-pulse rounded bg-base-200" />

          <div className="flex h-12 w-full animate-pulse rounded-btn bg-base-200" />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
