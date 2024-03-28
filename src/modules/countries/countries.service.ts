import axios from 'axios'
import countries from '../../utils/countries'
import { prisma, disconnectPrisma } from '../../prisma'

interface Country {
  id: string
  name: string
  flag: string
}

const getCountriesFromDB = async () => {
  try {
    const countriesDb = await prisma.country.findMany({})
    console.log(countriesDb)

    if (countriesDb.length === 0) {
      const countriesFromApi = (
        await axios.get(
          'https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=07a2818d03d27b302aaa73fda0c4f85e2f7c0ca2ca6cb63d77bbe2510c52c192'
        )
      ).data.result
      console.log(countriesFromApi.length)

      const newCountries: Country[] = []
      const missedCountries: any = []

      countriesFromApi.forEach((country: any) => {
        if (countries.includes(country.country_name)) {
          newCountries.push({
            id: String(country.country_key),
            name: country.country_name,
            flag: country.country_logo
          })
        }
      })

      for (let i = 0; i < countries.length; i++) {
        let countryFound = false
        for (let j = 0; j < newCountries.length; j++) {
          if (countries[i] === newCountries[j].name) {
            countryFound = true
            break
          }
        }
        if (!countryFound) {
          missedCountries.push(countries[i])
        }
      }

      console.log(missedCountries)
      console.log(typeof newCountries[1].id)

      const countriesData = newCountries.map((country) => ({
        id: country.id,
        name: country.name,
        flag: country.flag
      }))

      // Pasar el array de objetos a createMany
      const data = await prisma.country.createMany({
        data: countriesData
      })

      return data
    }
    return countriesDb
  } catch (error) {
    throw error
  }
}

export { getCountriesFromDB }
