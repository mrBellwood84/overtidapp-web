export const appConfig = {

    apiUrl: "https://localhost:7015/api/",
    brregUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/",
    employerDataSource: "https://www.brreg.no",

    // calculator cannot add data from before 2020
    calculatorMinYear: 2020,
    calculatorMinDate: "2020-01-01",

    // calculator cannot add data higher than current year
    calculatorMaxYear: new Date().getFullYear(),
    calculatorMaxDate: `${new Date().getFullYear()}-12-31`,

    validIndustryCodes: [
        "55.101",   // hotel with restaurant
        "55.102",   // hotel withour restaurant
        "56.101",   // restaurant,
        "56.301",   // pub / bars
        "56.309",   // pub / bars
    ]
}