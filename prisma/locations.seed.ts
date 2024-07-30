import { prisma } from '@/lib/db/prisma';
import { env } from '@/lib/env';
import axios from 'axios';

const RAJAONGKIR_API_KEY = env.RAJAONGKIR_API_KEY;
const RAJAONGKIR_BASE_URL = env.RAJAONGKIR_API_BASEURL;

async function fetchProvinces() {
  try {
    const response = await axios.get(`${RAJAONGKIR_BASE_URL}/province`, {
      headers: { key: RAJAONGKIR_API_KEY }
    })
    return response.data.rajaongkir.results
  } catch (error) {
    console.error('Error fetching provinces:', error)
    return []
  }
}

async function fetchCities(provinceId: string) {
  try {
    const response = await axios.get(`${RAJAONGKIR_BASE_URL}/city?province=${provinceId}`, {
      headers: { key: RAJAONGKIR_API_KEY }
    })
    return response.data.rajaongkir.results
  } catch (error) {
    console.error(`Error fetching cities for province ${provinceId}:`, error)
    return []
  }
}

async function seedProvincesAndCities() {
  console.log('Start seeding provinces and cities...')

  const provinces = await fetchProvinces()

  for (const province of provinces) {
    const createdProvince = await prisma.provinces.create({
      data: {
        name: province.province,
      },
    })

    console.log(`Created province with id: ${createdProvince.provinceId}`)

    const cities = await fetchCities(province.province_id)

    for (const city of cities) {
      const createdCity = await prisma.cities.create({
        data: {
          name: city.city_name,
          provinceId: createdProvince.provinceId,
        },
      })

      console.log(`Created city with id: ${createdCity.cityId}`)
    }
  }

  console.log('Seeding provinces and cities finished.')
}

seedProvincesAndCities()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })