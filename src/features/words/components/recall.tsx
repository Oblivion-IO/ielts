import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent } from "@/common/components/ui/card";
import {
  useRecallWords,
  RecallDifficulty,
} from "@/features/recall/hooks/useRecallWords";
import "./recall.css";

export default function Recall() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [showAnswer, setShowAnswer] = useState(false);

  const {
    recallWords,
    currentIndex,
    totalWords,
    sessionComplete,
    handleRecall,
    goToWord,
    hasWords,
  } = useRecallWords();

  useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== currentIndex) {
      emblaApi.scrollTo(currentIndex);
    }
  }, [currentIndex, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      goToWord(selectedIndex);
      setShowAnswer(false);
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, goToWord]);

  const onRecall = (difficulty: RecallDifficulty) => {
    handleRecall(difficulty);
    setShowAnswer(false);
  };

  if (!hasWords) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold mb-4">No words to recall right now</h2>
        <p>All caught up! Check back later for more words to review.</p>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold mb-4">Review Session Complete!</h2>
        <p className="mb-6">
          You've reviewed all {totalWords} words in this session.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Return to Vocabulary
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 w-full">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Vocabulary Recall</h1>
        <p className="text-gray-500">
          {currentIndex + 1} of {totalWords} words to review
        </p>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {recallWords.map((word) => (
            <div key={word.id} className="embla__slide w-full">
              <Card className="w-full p-6">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-center mb-6">
                    {word.word}
                  </h2>

                  {showAnswer ? (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Description:
                        </h3>
                        <p>{word.description}</p>
                      </div>

                      {word.sentences.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h3 className="font-medium text-gray-700 mb-2">
                            Example Sentences:
                          </h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {word.sentences.map((sentence) => (
                              <li key={sentence.id}>{sentence.sentence}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Button
                        onClick={() => setShowAnswer(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md"
                      >
                        Show Answer
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {showAnswer && (
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            onClick={() => onRecall("HARD")}
            className="bg-red-500 text-white px-6 py-2 rounded-md"
          >
            Hard (30m)
          </Button>
          <Button
            onClick={() => onRecall("MEDIUM")}
            className="bg-yellow-500 text-white px-6 py-2 rounded-md"
          >
            Medium (1d)
          </Button>
          <Button
            onClick={() => onRecall("EASY")}
            className="bg-green-500 text-white px-6 py-2 rounded-md"
          >
            Easy (7d)
          </Button>
        </div>
      )}
    </div>
  );
}
