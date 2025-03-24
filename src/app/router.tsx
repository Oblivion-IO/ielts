import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";
import WordPage from "@/pages/word";
import RecallPage from "@/pages/recall-page";
import StatsPage from "@/pages/stats";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/words/:slug" element={<WordPage />} />
      <Route path="/recall" element={<RecallPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}
