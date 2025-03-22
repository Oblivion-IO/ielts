import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home";
import WordPage from "@/pages/word";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/words/:slug" element={<WordPage />} />
    </Routes>
  );
}
