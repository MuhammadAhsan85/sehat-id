/**
 * LocationPicker — cascading Country → State → City combobox
 *
 * Built with:
 *  - country-state-city  (data, no static JSON in bundle)
 *  - Custom searchable combobox (TypeAhead input + filtered dropdown)
 *  - Tailwind CSS, white theme to match the rest of the site
 *
 * Props:
 *  - onChange: called with { countryCode, countryName, stateCode, stateName, city }
 *              whenever any level changes
 *  - defaultCountry / defaultState / defaultCity: optional initial values
 *  - className: wrapper class override
 */

"use client";

import {
    useState,
    useRef,
    useEffect,
    useCallback,
    type KeyboardEvent,
} from "react";
import { Country, State, City } from "country-state-city";
import type { ICountry, IState, ICity } from "country-state-city";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface LocationValue {
    countryCode: string;
    countryName: string;
    stateCode: string;
    stateName: string;
    city: string;
}

interface LocationPickerProps {
    onChange?: (value: LocationValue) => void;
    defaultCountry?: string; // ISO alpha-2, e.g. "PK"
    defaultState?: string;   // state/province ISO code
    defaultCity?: string;
    className?: string;
}

// ── Combobox ───────────────────────────────────────────────────────────────────

interface ComboboxOption {
    value: string;
    label: string;
    prefix?: string; // flag emoji or region code prefix
}

interface ComboboxProps {
    id: string;
    label: string;
    placeholder: string;
    options: ComboboxOption[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

function Combobox({
    id,
    label,
    placeholder,
    options,
    value,
    onChange,
    disabled = false,
}: ComboboxProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Derive display label from value
    const selectedOption = options.find((o) => o.value === value);
    const displayValue = selectedOption
        ? [selectedOption.prefix, selectedOption.label].filter(Boolean).join(" ")
        : "";

    // Filter options by query
    const filtered = query
        ? options.filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase())
        )
        : options;

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setQuery("");
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Scroll active item into view
    useEffect(() => {
        if (isOpen && listRef.current) {
            const active = listRef.current.querySelector<HTMLLIElement>(`[data-active="true"]`);
            active?.scrollIntoView({ block: "nearest" });
        }
    }, [activeIdx, isOpen]);

    function handleOpen() {
        if (disabled) return;
        setIsOpen(true);
        setActiveIdx(0);
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    function handleSelect(opt: ComboboxOption) {
        onChange(opt.value);
        setIsOpen(false);
        setQuery("");
        setActiveIdx(0);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[activeIdx]) handleSelect(filtered[activeIdx]);
        } else if (e.key === "Escape") {
            setIsOpen(false);
            setQuery("");
        }
    }

    const inputCls = [
        "w-full h-11 rounded-xl border px-4 py-2.5 text-sm text-gray-900",
        "placeholder-gray-400 bg-white",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500",
        disabled
            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
            : "border-gray-300 cursor-pointer hover:border-gray-400",
    ].join(" ");

    return (
        <div ref={wrapperRef} className={`relative flex flex-col gap-1.5 ${disabled ? "opacity-60" : ""}`}>
            <label htmlFor={id} className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                {label}
            </label>

            {/* Trigger button */}
            <button
                id={`${id}-trigger`}
                type="button"
                onClick={handleOpen}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={`${id}-list`}
                className={inputCls + " flex items-center justify-between text-left"}
                title={displayValue || placeholder}
            >
                <span className={`truncate ${!displayValue ? "text-gray-400" : ""}`}>
                    {displayValue || placeholder}
                </span>
                <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className={`ml-2 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                >
                    <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-2xl border border-gray-100 bg-white shadow-xl overflow-hidden">
                    {/* Search input */}
                    <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                            <svg
                                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                ref={inputRef}
                                id={id}
                                type="text"
                                role="combobox"
                                aria-autocomplete="list"
                                aria-controls={`${id}-list`}
                                aria-activedescendant={filtered[activeIdx] ? `${id}-opt-${activeIdx}` : undefined}
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                                onKeyDown={handleKeyDown}
                                placeholder={`Search ${label.toLowerCase()}…`}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                        </div>
                    </div>

                    {/* Options list */}
                    <ul
                        ref={listRef}
                        id={`${id}-list`}
                        role="listbox"
                        aria-label={label}
                        className="max-h-56 overflow-y-auto py-1"
                    >
                        {filtered.length === 0 ? (
                            <li className="px-4 py-3 text-sm text-gray-400 text-center">No results found</li>
                        ) : (
                            filtered.map((opt, i) => {
                                const isSelected = opt.value === value;
                                const isActive = i === activeIdx;
                                return (
                                    <li
                                        key={opt.value}
                                        id={`${id}-opt-${i}`}
                                        role="option"
                                        aria-selected={isSelected}
                                        data-active={isActive}
                                        onClick={() => handleSelect(opt)}
                                        className={[
                                            "flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer select-none",
                                            isSelected ? "bg-red-50 text-red-700 font-semibold" : "text-gray-700",
                                            isActive && !isSelected ? "bg-gray-50" : "",
                                        ].join(" ")}
                                    >
                                        {opt.prefix && <span className="text-base leading-none shrink-0">{opt.prefix}</span>}
                                        <span className="truncate">{opt.label}</span>
                                        {isSelected && (
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto shrink-0" aria-hidden="true">
                                                <path d="M2 6l3 3 5-5" stroke="#c41c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ── Flag helper ────────────────────────────────────────────────────────────────
// country-state-city uses ISO alpha-2 codes — convert to emoji flag
function countryCodeToFlag(isoCode: string): string {
    // Each letter is offset from 'A' (U+1F1E6) by its position in the alphabet
    return isoCode
        .toUpperCase()
        .split("")
        .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
        .join("");
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function LocationPicker({
    onChange,
    defaultCountry = "",
    defaultState = "",
    defaultCity = "",
    className = "",
}: LocationPickerProps) {
    const [countryCode, setCountryCode] = useState(defaultCountry);
    const [stateCode, setStateCode] = useState(defaultState);
    const [cityName, setCityName] = useState(defaultCity);

    // ── Derived data from country-state-city ──────────────────────────────────

    const countryOptions: ComboboxOption[] = Country.getAllCountries().map((c: ICountry) => ({
        value: c.isoCode,
        label: c.name,
        prefix: countryCodeToFlag(c.isoCode),
    }));

    const stateOptions: ComboboxOption[] = countryCode
        ? State.getStatesOfCountry(countryCode).map((s: IState) => ({
            value: s.isoCode,
            label: s.name,
        }))
        : [];

    const cityOptions: ComboboxOption[] = countryCode && stateCode
        ? City.getCitiesOfState(countryCode, stateCode).map((ci: ICity) => ({
            value: ci.name,
            label: ci.name,
        }))
        : [];

    // Emit callback
    const emit = useCallback(
        (cc: string, sc: string, city: string) => {
            if (!onChange) return;
            const country = Country.getCountryByCode(cc);
            const state = sc ? State.getStateByCodeAndCountry(sc, cc) : null;
            onChange({
                countryCode: cc,
                countryName: country?.name ?? "",
                stateCode: sc,
                stateName: state?.name ?? "",
                city,
            });
        },
        [onChange]
    );

    // ── Handlers ──────────────────────────────────────────────────────────────

    function handleCountryChange(code: string) {
        setCountryCode(code);
        setStateCode("");
        setCityName("");
        emit(code, "", "");
    }

    function handleStateChange(code: string) {
        setStateCode(code);
        setCityName("");
        emit(countryCode, code, "");
    }

    function handleCityChange(city: string) {
        setCityName(city);
        emit(countryCode, stateCode, city);
    }

    return (
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3 ${className}`}>
            {/* Level 1: Country */}
            <Combobox
                id="location-country"
                label="Country"
                placeholder="Select Country…"
                options={countryOptions}
                value={countryCode}
                onChange={handleCountryChange}
            />

            {/* Level 2: State / Province */}
            <Combobox
                id="location-state"
                label="State / Province"
                placeholder={countryCode ? "Select State…" : "Select country first"}
                options={stateOptions}
                value={stateCode}
                onChange={handleStateChange}
                disabled={!countryCode || stateOptions.length === 0}
            />

            {/* Level 3: City */}
            <Combobox
                id="location-city"
                label="City / Area"
                placeholder={stateCode ? "Select City…" : "Select state first"}
                options={cityOptions}
                value={cityName}
                onChange={handleCityChange}
                disabled={!stateCode || cityOptions.length === 0}
            />
        </div>
    );
}
