import { useEffect, useRef, useState } from "react";

/* ===================== TYPES ===================== */

export interface SelectOption {
  label?: string;
  value?: string | number;
  [key: string]: any;
}

interface CustomSelectProps<T = SelectOption> {
  id?: string;
  name?: string;
  options?: T[];
  value?: T | T[] | null;
  defaultValue?: T | T[] | null;
  onChange?: (value: T | T[] | null) => void;
  placeholder?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  className?: string;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
}

/* ===================== COMPONENT ===================== */

const CustomSelect = <T extends SelectOption>({
  id,
  name,
  options = [],
  value,
  defaultValue = null,
  onChange,
  placeholder = "",
  isMulti = false,
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  className = "",
  getOptionLabel = (o) => o?.label ?? "",
  getOptionValue = (o) => o?.value ?? "",
}: CustomSelectProps<T>) => {
  /* ===================== STATE & REFS ===================== */

  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [selectedHighlightIndex, setSelectedHighlightIndex] =
    useState<number>(-1);

  const [internalValue, setInternalValue] = useState<T | T[] | null>(
    value !== undefined ? value : defaultValue,
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const valueContainerRef = useRef<HTMLDivElement | null>(null);

  /* ===================== EFFECTS ===================== */

  // outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSelectedHighlightIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // sync controlled value
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  // scroll highlighted option into view
  useEffect(() => {
    const el = optionRefs.current[highlightedIndex];
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  // reset highlight when open or search changes
  useEffect(() => {
    if (open) setHighlightedIndex(0);
  }, [open, search]);

  // auto scroll multi selected container to bottom
  useEffect(() => {
    if (isMulti && valueContainerRef.current) {
      valueContainerRef.current.scrollTop =
        valueContainerRef.current.scrollHeight;
    }
  }, [isMulti, internalValue]);

  /* ===================== DERIVED ===================== */

  const selected: T[] = isMulti
    ? Array.isArray(internalValue)
      ? internalValue
      : []
    : internalValue
      ? [internalValue as T]
      : [];

  const handleChange = (val: T | T[] | null) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const selectOption = (option: T) => {
    if (isMulti) {
      handleChange([...selected, option]);
    } else {
      handleChange(option);
      setOpen(false);
    }
    setSearch("");
  };

  const removeOption = (option: T) => {
    if (isMulti) {
      handleChange(
        selected.filter((v) => getOptionValue(v) !== getOptionValue(option)),
      );
    } else {
      handleChange(null);
    }
  };

  const filteredOptions = options.filter((o) => {
    const alreadySelected = selected.some(
      (s) => getOptionValue(s) === getOptionValue(o),
    );
    if (alreadySelected) return false;
    if (!isSearchable) return true;

    return getOptionLabel(o)
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  /* ===================== KEYBOARD ===================== */

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>,
  ) => {
    // multi: navigate selected items when closed
    if (isMulti && !open && selected.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedHighlightIndex((i) => Math.min(i + 1, selected.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedHighlightIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter" && selectedHighlightIndex >= 0) {
        e.preventDefault();
        removeOption(selected[selectedHighlightIndex]);
        setSelectedHighlightIndex(-1);
        return;
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(0);
        return;
      }
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    }

    if (!open) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredOptions[highlightedIndex];
      if (opt) selectOption(opt);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  /* ===================== RENDER ===================== */

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${className} ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {name && (
        <label htmlFor={id} className="block mb-1 text-sm">
          {name}
        </label>
      )}

      {/* Control */}
      <div
        ref={valueContainerRef}
        className={`border rounded-md 
          flex gap-1 items-center cursor-text px-4 py-1.5
          ${
            isMulti
              ? "min-h-10 max-h-16 flex-wrap overflow-y-auto px-2 py-1"
              : "h-fit"
          }`}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        onKeyDown={handleKeyDown}
      >
        <input type="hidden" id={id} name={name} />

        {/* Selected preview */}
        {selected.map((item, index) => (
          <span
            key={String(getOptionValue(item))}
            className={`px-2 rounded flex items-center gap-2 ${
              isMulti && index === selectedHighlightIndex
                ? "bg-gray-200"
                : "bg-primary-bg"
            }`}
          >
            <span className="truncate">{getOptionLabel(item)}</span>
            {isClearable && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(item);
                }}
                className="cursor-pointer text-sm font-bold text-red-500"
                aria-label="remove"
              >
                ✕
              </button>
            )}
          </span>
        ))}

        {isSearchable && (
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              selected.length === 0 && search.length === 0 ? placeholder : ""
            }
            readOnly={!isMulti}
            className={`flex-1 outline-none text-sm min-w-30 bg-transparent ${
              !isMulti ? "cursor-pointer caret-transparent" : "cursor-text"
            }`}
          />
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 w-full mt-0.5 border border-muted rounded bg-white max-h-56 overflow-y-auto shadow">
          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm">No options</div>
          )}

          {filteredOptions.map((opt, index) => (
            <div
              key={String(getOptionValue(opt))}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(opt)}
              className={`px-3 py-2 cursor-pointer text-sm flex justify-between items-center ${
                index === highlightedIndex
                  ? "bg-primary-soft"
                  : "hover:bg-primary-bg"
              }`}
            >
              <div className="truncate">{getOptionLabel(opt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
