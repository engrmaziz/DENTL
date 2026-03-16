export default function Loading() {
  return (
    <div className="pt-20 bg-white pb-24 animate-pulse">
      {/* Cover Image & Title Skeleton */}
      <div className="w-full h-[300px] lg:h-[400px] bg-slate-200 flex items-center justify-center">
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
          <div className="h-4 bg-slate-300 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-slate-300 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-slate-300 rounded w-3/4 max-w-2xl"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <div className="h-8 bg-slate-200 rounded w-1/3 mb-6"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6 mb-8"></div>
              
              <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-14 bg-slate-100 rounded-2xl"></div>
                ))}
              </div>
            </section>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 h-64"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
