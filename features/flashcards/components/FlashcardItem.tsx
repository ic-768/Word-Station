interface FlashcardItemProps {
  className: string;
  onClick: () => void;
  text: string;
}

/**
 * Either a word or a definition, used for flashcard matching
 */
const FlashcardItem = ({ className, onClick, text }: FlashcardItemProps) => (
  <li className={`flex p-4 rounded ${className}`}>
    <button onClick={onClick} className="flex-1">
      {text}
    </button>
  </li>
);

export default FlashcardItem;
