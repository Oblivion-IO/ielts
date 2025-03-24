import GoBack from "@/common/components/core/goback";
import Recall from "@/features/words/components/recall";

export default function RecallPage() {
  return (
    <div className="container py-5 mx-auto min-h-screen flex flex-col gap-5">
      <div>
        <GoBack />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Recall />
      </div>
    </div>
  );
}
