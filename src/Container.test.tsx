import React from "react";
import {createSummary} from "./Container";


const summaryData = {
    "Global": {
        "NewConfirmed": 165172,
        "TotalConfirmed": 9366512,
        "NewDeaths": 5431,
        "TotalDeaths": 486079,
        "NewRecovered": 104369,
        "TotalRecovered": 4630051
    },
    "Countries": [
        {
            "Country": "Afghanistan",
            "CountryCode": "AF",
            "Slug": "afghanistan",
            "NewConfirmed": 324,
            "TotalConfirmed": 29481,
            "NewDeaths": 20,
            "TotalDeaths": 618,
            "NewRecovered": 419,
            "TotalRecovered": 9260,
            "Date": "2020-06-24T13:04:00Z"
        },
        {
            "Country": "Albania",
            "CountryCode": "AL",
            "Slug": "albania",
            "NewConfirmed": 52,
            "TotalConfirmed": 2047,
            "NewDeaths": 1,
            "TotalDeaths": 45,
            "NewRecovered": 36,
            "TotalRecovered": 1195,
            "Date": "2020-06-24T13:04:00Z"
        }
    ]
};

it("calls summary and checks result", () => {
    const newSummary = createSummary(summaryData);
    expect(newSummary.data).toBeDefined();
    expect(newSummary.Global).toBeDefined();
    expect(newSummary.minConfirmed).toBeDefined();
    expect(newSummary.maxConfirmed).toBeDefined();
    expect(newSummary.data.length).toBeGreaterThan(1);
});