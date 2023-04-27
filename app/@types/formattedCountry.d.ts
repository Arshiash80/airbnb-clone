interface IFormattedCountry {
    /** Country's CCA2 value */
    value: string,
    /** Country's common name */
    label: string,
    /** Country's flag string */
    flag: string,
    /** Country's latitude and longitude */
    latlng: [number, number],
    /** Cuntry's region name */
    region: string
}