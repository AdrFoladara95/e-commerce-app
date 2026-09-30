import { Mic, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar({ value, onChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isListening, setIsListening] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const searchValue = value ?? internalValue;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleSearch = () => {
    const searchTerm = searchValue.trim();

    if (!searchTerm) {
      return;
    }

    const params = new URLSearchParams(location.search);

    params.delete("category");
    params.delete("deal");
    params.delete("new");

    params.set("search", searchTerm);

    navigate(`/shop?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported on this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      if (onChange) {
        onChange({
          target: {
            value: transcript,
          },
        });
      } else {
        setInternalValue(transcript);
      }

      const params = new URLSearchParams(location.search);

      params.delete("category");
      params.delete("deal");
      params.delete("new");

      params.set("search", transcript);

      navigate(`/shop?${params.toString()}`);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="mx-auto mt-2 w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
      <div className="flex h-12 items-center rounded-lg bg-white px-4 shadow-[0_0_50px_rgba(0,0,0,0.1)] md:h-13 lg:h-14">
        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 text-gray-400"
          aria-label="Search"
        >
          <Search
            size={21}
            className="md:h-5.5 md:w-5.5"
          />
        </button>

        {/* Search Input */}
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="min-w-0 flex-1 px-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 md:px-4 md:text-base"
        />

        {/* Microphone */}
        <button
          type="button"
          onClick={startVoiceSearch}
          className={`shrink-0 transition-colors ${
            isListening
              ? "text-red-500"
              : "text-gray-500 hover:text-indigo-500"
          }`}
          aria-label="Voice search"
        >
          <Mic
            size={21}
            strokeWidth={2}
            className={isListening ? "animate-pulse" : ""}
          />
        </button>
      </div>
    </div>
  );
}