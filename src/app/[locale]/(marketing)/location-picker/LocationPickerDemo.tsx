"use client";

import { useState } from "react";
import LocationPicker, { type LocationValue } from "@/shared/components/LocationPicker";

export default function LocationPickerDemo() {
    const [location, setLocation] = useState<LocationValue | null>(null);

    return (
        <div className="space-y-6">
            {/* The picker */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-base font-bold text-gray-900">
                    Set Your Location
                </h2>
                <LocationPicker onChange={setLocation} />
            </div>

            {/* Live selection preview */}
            {location && location.countryName && (
                <div className="rounded-2xl border border-green-100 bg-green-50 p-5 text-sm text-green-800">
                    <p className="font-bold mb-1">📍 Selected Location</p>
                    <p>
                        <span className="font-semibold">Country:</span> {location.countryName} ({location.countryCode})
                    </p>
                    {location.stateName && (
                        <p>
                            <span className="font-semibold">State:</span> {location.stateName}
                        </p>
                    )}
                    {location.city && (
                        <p>
                            <span className="font-semibold">City:</span> {location.city}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
