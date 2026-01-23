import { useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleXIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const InputClearDemo = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const id = useId();
  const navigate = useNavigate();

  const handleClearInput = () => {
    setValue("");
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (value.trim()) {
      navigate(
        `/foodies/search?sortBy=title&query=${encodeURIComponent(value.trim())}`,
      );
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-16" // space for 2 icons
        />

        {/* Search button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleSearch}
          className="absolute inset-y-0 right-8 text-muted-foreground hover:bg-transparent">
          <SearchIcon size={18} />
          <span className="sr-only">Search</span>
        </Button>

        {/* Clear button */}
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClearInput}
            className="absolute inset-y-0 right-0 rounded-l-none text-muted-foreground hover:bg-transparent">
            <CircleXIcon size={18} />
            <span className="sr-only">Clear input</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default InputClearDemo;
