import { prisma } from "@/lib/db/prisma"

const placeholder_data = [
    {
      "provinsi":"Aceh",
      "kota":[
        "Kota Banda Aceh",
        "Kota Sabang",
        "Kota Lhokseumawe",
        "Kota Langsa",      
        "Kota Subulussalam",
      ]
    },
  
    {
      "provinsi":"Sumatera Utara",
      "kota":[      
        "Kota Medan",
        "Kota Pematang Siantar",
        "Kota Sibolga",
        "Kota Tanjung Balai",
        "Kota Binjai",
        "Kota Tebing Tinggi",
        "Kota Padang Sidempuan",
        "Kota Gunung Sitoli",
        ]
    },
  
    {
      "provinsi":"Sumatera Barat",
      "kota":[
        "Kota Padang",
        "Kota Solok",
        "Kota Sawhlunto",
        "Kota Padang Panjang",
        "Kota Bukittinggi",
        "Kota Payakumbuh",
        "Kota Pariaman",
      ]
    },
  
    {
      "provinsi":"Riau",
      "kota":[      
        "Kota Pekan Baru",
        "Kota Dumai",
      ]
    },
  
    {
      "provinsi":"Jambi",
      "kota":[
        "Kota Jambi",
        "Kota Sungai Penuh",
      ]
    },
  
    {
      "provinsi":"Sumatera Selatan",
      "kota":[
        "Kota Palembang",
        "Kota Pagar Alam",
        "Kota Lubuk Linggau",
        "Kota Prabumulih",
      ]
    },
  
    {
      "provinsi":"Bengkulu",
      "kota":[
        "Kota Bengkulu",
      ]
    },
  
    {
      "provinsi":"Lampung",
      "kota":[      
        "Kota Bandar Lampung",
        "Kota Metro",
      ]
    },
  
    {
      "provinsi":"Kepulauan Bangka Belitung",
      "kota":[
        "Kota Pangkal Pinang",
      ]
    },
    
    {
      "provinsi":"Kepulauan Riau",
      "kota":[
        "Kota Batam",
        "Kota Tanjung Pinang",
      ]
    },
  
    {
      "provinsi":"DKI Jakarta",
      "kota":[
        "Kota Jakarta Timur",
        "Kota Jakarta Selatan",
        "Kota Jakarta Barat",
        "Kota Jakarta Utara",
        "Kota Jakarta Pusat",
      ]
    },
  
    {
      "provinsi":"Jawa Barat",
      "kota":[
        "Kota Bandung",
        "Kota Banjar",
        "Kota Tasikmalaya",
        "Kota Cimahi",
        "Kota Depok",
        "Kota Bekasi",
        "Kota Cirebon",      
        "Kota Sukabumi",
        "Kota Bogor",
      ]
    },
  
    {
      "provinsi":"Jawa Tengah",
      "kota":[
        "Kota Semarang",
        "Kota Tegal",
        "Kota Pekalongan",      
        "Kota Salatiga",
        "Kota Surakarta",
        "Kota Magelang",
      ]
    },
  
    {
      "provinsi":"DI Yogyakarta",
      "kota":[
        "Kota Yogyakarta",
      ]
    },
  
    {
      "provinsi":"Jawa Timur",
      "kota":[
        "Kota Surabaya",
        "Kota Batu",      
        "Kota Madiun",
        "Kota Mojokerto",
        "Kota Pasuruan",
        "Kota Probolinggo",
        "Kota Malang",
        "Kota Blitar",
        "Kota Kediri",
      ]
    },
  
    {
      "provinsi":"Banten",
      "kota":[
        "Kota Serang",
        "Kota Cilegon",
        "Kota Tangerang",
        "Kota Tangerang Selatan",
      ]
    },
  
    {
      "provinsi":"Bali",
      "kota":[
        "Kota Denpasar",
      ]
    },
    {
      "provinsi":"Nusa Tenggara Barat",
      "kota":[
        "Kota Mataram",
        "Kota Bima",
      ]
    },
  
    {
      "provinsi":"Nusa Tenggara Timur",
      "kota":[
        "Kota Kupang",
      ]
    },
    {
      "provinsi":"Kalimantan Barat",
      "kota":[
        "Kota Pontianak",
        "Kota Singkawang",
      ]
    },
  
    {
      "provinsi":"Kalimantan Tengah",
      "kota":[
        "Kota Palangkaraya",
      ]
    },
  
    {
      "provinsi":"Kalimantan Selatan",
      "kota":[
        "Kota Banjarmasin",
        "Kota Banjarbaru",      
      ]
    },
  
    {
      "provinsi":"Kalimantan Timur",
      "kota":[
        "Kota Samarinda",
        "Kota Bontang",
        "Kota Balikpapan",
      ]
    },
  
    {
      "provinsi":"Kalimantan Utara",
      "kota":[
        "Kota Tarakan",
      ]
    },
  
    {
      "provinsi":"Sulawesi Utara",
      "kota":[
        "Kota Manado",
        "Kota Tomohon",
        "Kota Bitung",
        "Kota Kotamobagu",
      ]
    },
  
    {
      "provinsi":"Sulawesi Tengah",
      "kota":[
        "Kota Palu",
      ]
    },
  
    {
      "provinsi":"Sulawesi Selatan",
      "kota":[
        "Kota Makasar",
        "Kota Palopo",
        "Kota Pare Pare", 
      ]
    },
  
    {
      "provinsi":"Sulawesi Tenggara",
      "kota":[
        "Kota Kendari",
        "Kota Bau Bau",
      ]
    },
  
    {
      "provinsi":"Gorontalo",
      "kota":[
        "Kota Gorontalo",
      ]
    },
    {
      "provinsi":"Maluku",
      "kota":[
        "Kota Ambon",
        "Kota Tual",
      ]
    },
  
    {
      "provinsi":"Maluku Utara",
      "kota":[
        "Kota Ternate",
        "Kota Tidore Kepulauan",
      ]
    },
  
    {
      "provinsi":"Papua",
      "kota":[
        "Kota Jayapura",
      ]
    },
  
    {
      "provinsi":"Papua Barat",
      "kota":[
        "Kota Sorong",      
      ]
    }
  ]

  async function seed(){
    await Promise.all(
      placeholder_data.map(async (record) => {
        return prisma.provinces.create({
          data: {
            name: record.provinsi,
          }
        })
      })
    )
    
    await Promise.all(
      placeholder_data[32].kota.map(async (record) => {
        return prisma.cities.create({
          data: {
            name: record,
            provinceId: 'clu5b6gc0000ucdjwh1b9d3b3'
          }
        })
      })
    )
  }
  
  seed();  

  