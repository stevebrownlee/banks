const core = require('@actions/core');
const { calculateYearlyExpenses, calculateExpensesPercentage, isQualified } = require("./main.js")


const mortgageApplicants = [
    { id: 1, name: "James Runolfsdottir", monthlyExpenses: 343.7, salary: 49938.68, mortgage: {}, address: "866 Weissnat Forks", city: "South Dario" },
    { id: 2, name: "Fannie Swaniawski", monthlyExpenses: 783.82, salary: 119255.48, mortgage: {}, address: "3350 McDermott Bridge", city: "Amaliaborough" },
    { id: 3, name: "Patsy Jaskolski", monthlyExpenses: 803.34, salary: 103376.76, mortgage: {}, address: "585 Kassulke River", city: "New Hattieport" },
    { id: 4, name: "Rufus Moore", monthlyExpenses: 845, salary: 88269.54, mortgage: {}, address: "46332 O'Hara Mountain", city: "North Idell" },
    { id: 5, name: "Philip Abshire", monthlyExpenses: 781.34, salary: 65333.78, mortgage: {}, address: "633 Thiel Ville", city: "Uliseston" },
    { id: 6, name: "Wendy Kiehn", monthlyExpenses: 537.32, salary: 59702.6, mortgage: {}, address: "82441 Mills Turnpike", city: "Port Libbieberg" },
    { id: 7, name: "Ray Lubowitz", monthlyExpenses: 550.15, salary: 181362.87, mortgage: {}, address: "855 Isabel Forge", city: "Hesseltown" },
    { id: 8, name: "Lawrence Hirthe MD", monthlyExpenses: 940.74, salary: 100269.15, mortgage: {}, address: "68459 Jordon Crossing", city: "Boview" },
    { id: 9, name: "Mario Beahan I", monthlyExpenses: 618.11, salary: 122226.79, mortgage: {}, address: "71521 Walter Drive", city: "Rosannaton" },
    { id: 10, name: "Rosa Hauck", monthlyExpenses: 763.82, salary: 89335.68, mortgage: {}, address: "33954 Reba Motorway", city: "Port Lesly" },
    { id: 11, name: "Becky Wiegand", monthlyExpenses: 212.27, salary: 76137.45, mortgage: {}, address: "3972 Stroman Parks", city: "West Clotildeport" },
]



const expenses = calculateYearlyExpenses(mortgageApplicants[0])

if (expenses !== 4124.4) {
    core.setFailed(`Yearly expenses were expected to be 4124.4, but got ${expenses} instead.`);
}

const percent = calculateExpensesPercentage(mortgageApplicants[0], expenses)

if (percent.toFixed(2) != 8.26) {
    core.setFailed(`Yearly expenses percentage of salary was expected to be 8.26, but got ${percent.toFixed(2)} instead.`);
}

const applicant = isQualified(mortgageApplicants[0], percent)



if (!applicant.mortgage.qualified) {
    core.info(`TEST PASSED: ${applicant.name} was successfully qualified for a maximum mortage of ${applicant.mortgage.amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2})}`)
}
else {
    core.setFailed(`TEST FAILED: ${applicant.name} should have been qualified for a loan, but was not.`)
}
