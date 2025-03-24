import GoBack from "@/common/components/core/goback";
import RecallStats from "@/features/recall/components/recall-stats";

export default function StatsPage() {
  return (
    <div className="container py-5 mx-auto min-h-screen flex flex-col gap-5">
      <div>
        <GoBack />
      </div>
      <RecallStats />
    </div>
  );
}
