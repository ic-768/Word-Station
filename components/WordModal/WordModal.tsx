import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

import { NotificationContext } from "../../context/notification";
import { WordMeanings } from "../../types/WordData";
import { PageButtons } from "./PageButtons";
import { PageCounter } from "./PageCounter";
import { DefinitionsList } from "./DefinitionsList";
import { SynonymsList } from "./SynonymsList";
import { handleAPICall } from "./helpers";

interface WordModalProps {
  meanings: WordMeanings;
  word: string;
  isWordSaved?: boolean;
  setIsWordSaved: Dispatch<SetStateAction<boolean>>;
}

const WordModal = ({
  meanings,
  word,
  isWordSaved,
  setIsWordSaved,
}: WordModalProps) => {
  const [page, setPage] = useState(0);
  const [_notification, setNotification] = useContext(NotificationContext);

  const pageData = meanings[page];

  if (!pageData) return null;

  const handleSave = async () =>
    await handleAPICall(
      word,
      "save-word",
      "POST",
      "Word saved successfully!",
      "Word is already saved",
      setNotification,
      setIsWordSaved
    );

  const handleDelete = async () =>
    await handleAPICall(
      word,
      "delete-word",
      "DELETE",
      "Word removed successfully!",
      "Something went wrong",
      setNotification,
      setIsWordSaved
    );

  return (
    <div className="absolute inset-x-0 max-w-lg p-8 mx-auto bg-white rounded top-32 drop-shadow-md">
      <div className="relative flex flex-col text-gray-500">
        <FontAwesomeIcon
          fontSize={24}
          cursor="pointer"
          onClick={isWordSaved ? handleDelete : handleSave}
          icon={isWordSaved ? solidHeart : emptyHeart}
        />

        <span className="text-xl font-semibold capitalize">{word}</span>
        <DefinitionsList pageData={pageData} />
        <SynonymsList pageData={pageData} />

        <PageButtons page={page} numPages={meanings.length} setPage={setPage} />
        <PageCounter page={page} numPages={meanings.length} />
      </div>
    </div>
  );
};

export default WordModal;
