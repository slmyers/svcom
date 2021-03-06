// I find it's better to start with an object even if a primitive (string) would do, 
// because if you go from prmitive -> object, you might have to make many small 
// changes in the app.
export const cities = [
    {display: "London", value: "london"},
    {display: "Boston", value: "boston"},
    {display: "Montreal", value: "montreal"},
    {display: "Winnipeg", value: "winnipeg"},
    {display: "Beijing", value: "beijing"}
].sort((a, b) => {
    return a.display.toLocaleLowerCase().localeCompare(
        b.display.toLocaleLowerCase()
    )
})

export function useCities() {
    return cities
}