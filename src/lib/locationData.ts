/**
 * Location data — maps each country ISO code to its cities and blood donation context.
 * Used by the LocationStore, DonorSearch, and BloodBanks to provide dynamic filtering.
 */

export interface CityRecord {
    name: string;
    region: string; // province / emirate / state
}

export interface CountryLocationData {
    countryCode: string;
    countryName: string;
    cities: CityRecord[];
}

export const LOCATION_DATA: CountryLocationData[] = [
    {
        countryCode: "PK",
        countryName: "Pakistan",
        cities: [
            { name: "Karachi", region: "Sindh" },
            { name: "Lahore", region: "Punjab" },
            { name: "Islamabad", region: "Islamabad Capital Territory" },
            { name: "Rawalpindi", region: "Punjab" },
            { name: "Faisalabad", region: "Punjab" },
            { name: "Peshawar", region: "KPK" },
            { name: "Quetta", region: "Balochistan" },
            { name: "Multan", region: "Punjab" },
            { name: "Hyderabad", region: "Sindh" },
            { name: "Gujranwala", region: "Punjab" },
        ],
    },
    {
        countryCode: "AE",
        countryName: "United Arab Emirates",
        cities: [
            { name: "Dubai", region: "Dubai" },
            { name: "Abu Dhabi", region: "Abu Dhabi" },
            { name: "Sharjah", region: "Sharjah" },
            { name: "Ajman", region: "Ajman" },
            { name: "Ras Al Khaimah", region: "Ras Al Khaimah" },
        ],
    },
    {
        countryCode: "SA",
        countryName: "Saudi Arabia",
        cities: [
            { name: "Riyadh", region: "Riyadh Province" },
            { name: "Jeddah", region: "Makkah Province" },
            { name: "Mecca", region: "Makkah Province" },
            { name: "Medina", region: "Madinah Province" },
            { name: "Dammam", region: "Eastern Province" },
        ],
    },
    {
        countryCode: "IN",
        countryName: "India",
        cities: [
            { name: "Mumbai", region: "Maharashtra" },
            { name: "Delhi", region: "Delhi" },
            { name: "Bangalore", region: "Karnataka" },
            { name: "Hyderabad", region: "Telangana" },
            { name: "Chennai", region: "Tamil Nadu" },
            { name: "Kolkata", region: "West Bengal" },
        ],
    },
    {
        countryCode: "CN",
        countryName: "China",
        cities: [
            { name: "Beijing", region: "Beijing" },
            { name: "Shanghai", region: "Shanghai" },
            { name: "Guangzhou", region: "Guangdong" },
            { name: "Shenzhen", region: "Guangdong" },
            { name: "Chengdu", region: "Sichuan" },
        ],
    },
    {
        countryCode: "US",
        countryName: "United States",
        cities: [
            { name: "New York", region: "New York" },
            { name: "Los Angeles", region: "California" },
            { name: "Chicago", region: "Illinois" },
            { name: "Houston", region: "Texas" },
            { name: "Phoenix", region: "Arizona" },
        ],
    },
    {
        countryCode: "GB",
        countryName: "United Kingdom",
        cities: [
            { name: "London", region: "England" },
            { name: "Manchester", region: "England" },
            { name: "Birmingham", region: "England" },
            { name: "Leeds", region: "England" },
            { name: "Glasgow", region: "Scotland" },
        ],
    },
    {
        countryCode: "CA",
        countryName: "Canada",
        cities: [
            { name: "Toronto", region: "Ontario" },
            { name: "Montreal", region: "Quebec" },
            { name: "Vancouver", region: "British Columbia" },
            { name: "Calgary", region: "Alberta" },
            { name: "Ottawa", region: "Ontario" },
        ],
    },
];

/** Get city list for a given country code (defaults to Pakistan if not found) */
export function getCitiesForCountry(countryCode: string): CityRecord[] {
    return (
        LOCATION_DATA.find((d) => d.countryCode === countryCode)?.cities ??
        LOCATION_DATA[0].cities
    );
}
