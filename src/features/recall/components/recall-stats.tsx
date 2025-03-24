import { useRecallWords } from "../hooks/useRecallWords";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/common/components/ui/card";

export default function RecallStats() {
  const { recallWords, currentIndex, totalWords, sessionComplete, hasWords } =
    useRecallWords();

  if (!hasWords) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recall Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No active recall session.</p>
        </CardContent>
      </Card>
    );
  }

  const completedWords = sessionComplete ? totalWords : currentIndex;
  const percentComplete =
    totalWords > 0 ? Math.round((completedWords / totalWords) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recall Session Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Progress</p>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Words Reviewed</p>
              <p className="text-xl font-bold">
                {completedWords} / {totalWords}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-xl font-bold">
                {sessionComplete ? "Complete" : "In Progress"}
              </p>
            </div>
          </div>

          {!sessionComplete && hasWords && (
            <div>
              <p className="text-sm text-gray-500">Current Word</p>
              <p className="text-xl font-bold">
                {recallWords[currentIndex]?.word || "None"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
