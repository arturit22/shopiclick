export const ProductCardSkeleton = () => {
    return (
        <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="h-60 bg-gray-200">
                <div className="flex flex-1 flex-col p-4">
                    <div className="mb-3 h-3 w-20 rounded bg-gray-200" />
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="mt-2 h-5 w-1/2 rounded bg-gray-200" />

                    <div className="mt-6 h-8 w-24 rounded bg-gray-200" />

                    <div className="mt-5 h-11 w-full rounded-xl bg-gray-200" />
                </div>
            </div>
        </div>
    )
}
