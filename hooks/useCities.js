const cities = [
    {display: "Edmonton", value: "edmonton"},
    {display: "Boston", value: "boston"},
    {display: "Montreal", value: "montreal"},
    {display: "Winnipeg", value: "winnipeg"},
    {display: "Vancouver", value: "vancouver"}
].sort((a, b) => {
    return a.display.toLocaleLowerCase().localeCompare(
        b.display.toLocaleLowerCase()
    )
})

export function useCities() {
    return cities
}