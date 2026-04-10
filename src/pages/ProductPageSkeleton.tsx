export const ProductPageSkeleton = () => {
    return (
        <section className="container mx-auto px-4 py-10">
            <div className="mb-6 h-5 w-32 animate-pulse rounded bg-gray-200" />

            <div className="grid gap-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
                <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-8">
                    <div className="h-[420px] w-full animate-pulse rounded-2xl bg-gray-200" />
                </div>

                <div className="flex flex-col">
                    <div className="mb-3 h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />

                    <div className="mt-6 space-y-3">
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="mt-8 h-12 w-32 animate-pulse rounded bg-gray-200" />

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <div className="h-12 w-36 animate-pulse rounded-xl bg-gray-200" />
                        <div className="h-12 w-36 animate-pulse rounded-xl bg-gray-200" />
                    </div>
                </div>
            </div>
        </section>
    )
}