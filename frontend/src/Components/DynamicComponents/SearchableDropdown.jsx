/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";

export default function SearchableDropdown({
  value = "",
  options = [],
  getOptionLabel,
  getOptionKey,
  onInputChange,
  onSelect,
  onBlur,
  name,
  id,
  placeholder,
  required = false,
  inputClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  noResultsText = "No matching results",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputValue = value || "";

  const filteredOptions = useMemo(() => {
    const searchTerm = inputValue.trim().toLowerCase();

    if (!searchTerm) {
      return options;
    }

    return options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(searchTerm)
    );
  }, [getOptionLabel, inputValue, options]);

  const handleInputChange = (event) => {
    setIsOpen(true);
    onInputChange(event);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        autoComplete="off"
        placeholder={placeholder}
        className={inputClassName}
        type="text"
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        onChange={handleInputChange}
        onBlur={(event) => {
          setIsOpen(false);
          onBlur?.(event);
        }}
        name={name}
        id={id || name}
        value={inputValue}
        required={required}
      />
      {isOpen && (
        <div
          className={`absolute left-0 top-full z-50 mt-1 flex max-h-[180px] w-full min-w-full flex-col overflow-y-auto rounded-md bg-gray-50 shadow-md ${dropdownClassName}`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                type="button"
                key={getOptionKey ? getOptionKey(option) : getOptionLabel(option)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(option)}
                className={`p-4 text-left transition-all duration-100 hover:bg-red-700 hover:text-white ${optionClassName}`}
              >
                {getOptionLabel(option)}
              </button>
            ))
          ) : (
            <div className="p-4 text-gray-500">{noResultsText}</div>
          )}
        </div>
      )}
    </div>
  );
}
