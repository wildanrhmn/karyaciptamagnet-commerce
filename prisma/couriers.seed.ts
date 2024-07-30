import { prisma } from "@/lib/db/prisma"

const courierData = [
  {
    code: "jne",
    name: "JNE (Jalur Nugraha Ekakurir)",
    services: {
      services: [
        { service: "REG", description: "Reguler" },
        { service: "YES", description: "Yakin Esok Sampai" },
        { service: "OKE", description: "Ongkos Kirim Ekonomis" }
      ]
    }
  },
  {
    code: "tiki",
    name: "TIKI (Titipan Kilat)",
    services: {
      services: [
        { service: "REG", description: "Reguler" },
        { service: "ECO", description: "Ekonomi" },
        { service: "ONS", description: "Over Night Service" }
      ]
    }
  },
  {
    code: "pos",
    name: "POS Indonesia (Pos Indonesia)",
    services: {
      services: [
        { service: "Paket Kilat Khusus", description: "Paket Kilat Khusus" },
        { service: "Express Next Day", description: "Express Next Day" }
      ]
    }
  }
]

async function seed() {
  console.log(`Start seeding ...`)

  for (const courier of courierData) {
    const createdCourier = await prisma.courier.create({
      data: {
        code: courier.code,
        name: courier.name,
        services: courier.services
      }
    })
    console.log(`Created courier with id: ${createdCourier.courierId}`)
  }

  console.log(`Seeding finished.`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })