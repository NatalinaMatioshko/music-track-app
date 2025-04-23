import React, { useState, useRef, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "../../utils/cn";

interface TagInputProps {
  label?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  options?: string[];
  error?: string;
  placeholder?: string;
  id?: string;
}

export function TagInput({
  label,
  tags,
  onChange,
  options = [],
  error,
  placeholder = "Add tag...",
  id,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tagInputId =
    id || `tag-input-${Math.random().toString(36).substring(2, 9)}`;

  const filteredOptions = options.filter(
    (option) =>
      !tags.includes(option) &&
      option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag]);
    }
    setInputValue("");
    inputRef.current?.focus();
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    } else if (e.key === "ArrowDown" && filteredOptions.length > 0) {
      setIsOptionsOpen(true);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={tagInputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex flex-wrap gap-2 px-3 py-2 border rounded-md focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500",
          error ? "border-red-300" : "border-gray-300"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="ml-1 text-purple-600 hover:text-purple-800 focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <div className="flex-1 min-w-24 relative">
          <input
            ref={inputRef}
            id={tagInputId}
            type="text"
            className="w-full border-0 p-0 focus:ring-0 focus:outline-none text-sm placeholder:text-gray-400"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOptionsOpen(e.target.value !== "");
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOptionsOpen(inputValue !== "")}
            onBlur={() => setTimeout(() => setIsOptionsOpen(false), 200)}
            placeholder={tags.length > 0 ? "" : placeholder}
          />

          {isOptionsOpen && filteredOptions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addTag(option)}
                >
                  <Plus className="w-3 h-3" />
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p
          className="mt-1 text-sm text-red-600"
          data-testid={`error-${tagInputId.replace("tag-input-", "")}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
