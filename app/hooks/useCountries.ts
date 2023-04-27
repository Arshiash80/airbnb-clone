import countries from "world-countries";

/**
 * All countries as `IFormattedCountry[]`
 */
const formattedCountries: IFormattedCountry[] = countries.map(country => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

/**
 * Countries hook.
 * @returns `{ getAll, getByValue }`
 */
const useCountries = () => {

    /**
     * Get all formatted countries
     * @returns List of formated countries. `IFormattedCountry[]`
     */
    const getAll = (): IFormattedCountry[] => formattedCountries

    /**
     * Get cuntry object by value
     * @param value Value of the country. `<cca2>`
     * @returns Country object, `<IFormattedCountry | undefined>`
     */
    const getByValue = (value: string): IFormattedCountry | undefined => {
        return formattedCountries.find(item => item.value === value)
    }

    return {
        getAll,
        getByValue
    }
}

export default useCountries