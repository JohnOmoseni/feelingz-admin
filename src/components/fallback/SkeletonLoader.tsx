type SkeletonProps = {
  hideCardLoading?: boolean;
  hideChartLoading?: boolean;
};

function SkeletonLoader({ hideCardLoading, hideChartLoading }: SkeletonProps) {
  return (
    <div className="flex-column gap-6">
      {/* CARDS LOADER */}
      {!hideCardLoading && (
        <div className="grid sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 sm:gap-5">
          {Array.from({ length: 4 })?.map((_, index) => (
            <div
              key={index}
              className="rounded-lg min-w-min bg-background shadow-sm border-b border-border-100 py-3.5 px-4"
            >
              <div className="flex-column gap-1.5">
                <span className="skeleton !h-2.5" />
                <span className="skeleton max-sm:!w-[200px] !w-[130px] lg:!w-[180px]" />
              </div>
            </div>
          ))}{" "}
        </div>
      )}

      {/* CHARTS LOADER */}
      {!hideChartLoading && (
        <div className="mt-4 flex-column sm:grid grid-cols-2 gap-7">
          <div className="flex-column gap-6 card">
            <h3 className="skeleton" />

            <div className="!h-[220px] !w-full skeleton"></div>
          </div>

          <div className="flex-column gap-3 card ">
            <h3 className="skeleton" />

            <div className="!h-[220px] !w-full skeleton"></div>
          </div>
        </div>
      )}

      {/* SEARCH LOADER */}
      <div className="mt-4 row-flex-btwn card !p-3">
        <div className="skeleton !w-[160px] !h-6" />
        <div className="skeleton" />
      </div>

      {/* TABLE LOADER */}

      <div className="card mt-4">
        <div className="flex-column w-full gap-6">
          <div className="!h-[220px] !w-full skeleton"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
