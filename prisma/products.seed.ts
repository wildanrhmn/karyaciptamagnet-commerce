import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categoryData = [
  { name: 'Rare Earth Magnets', slug: 'rare-earth-magnets' },
  { name: 'Flexible Magnets', slug: 'flexible-magnets' },
  { name: 'Magnetic Assembly', slug: 'magnetic-assembly' },
  { name: 'Magnetic Separator', slug: 'magnetic-separator' }
]

const subCategoryData = [
  { name: 'Neodymium Magnets', slug: 'neodymium-magnets', categoryName: 'Rare Earth Magnets' },
  { name: 'Samarium Cobalts Magnet', slug: 'samarium-cobalts-magnet', categoryName: 'Rare Earth Magnets' },
  { name: 'Wind Turbine Magnets', slug: 'wind-turbine-magnets', categoryName: 'Rare Earth Magnets' },
  { name: 'PM Motor Magnets', slug: 'pm-motor-magnets', categoryName: 'Rare Earth Magnets' },
  { name: 'Magnetic Sheets', slug: 'magnetic-sheets', categoryName: 'Flexible Magnets' },
  { name: 'Magnetic Strips', slug: 'magnetic-strips', categoryName: 'Flexible Magnets' },
  { name: 'Fridge Magnets', slug: 'fridge-magnets', categoryName: 'Flexible Magnets' },
  { name: 'Magnetic Bracelet', slug: 'magnetic-bracelet', categoryName: 'Flexible Magnets' },
  { name: 'Magnetic Educational Toys', slug: 'magnetic-educational-toys', categoryName: 'Flexible Magnets' },
  { name: 'Magnetic White Board', slug: 'magnetic-white-board', categoryName: 'Flexible Magnets' },
  { name: 'Magnetic Hooks', slug: 'magnetic-hooks', categoryName: 'Magnetic Assembly' },
  { name: 'Pot Magnet', slug: 'pot-magnet', categoryName: 'Magnetic Assembly' },
  { name: 'Rubber Coated Magnet', slug: 'rubber-coated-magnet', categoryName: 'Magnetic Assembly' },
  { name: 'Magnetic Component', slug: 'magnetic-component', categoryName: 'Magnetic Assembly' },
  { name: 'Magswitch', slug: 'magswitch', categoryName: 'Magnetic Assembly' },
  { name: 'Magnetic Bar', slug: 'magnetic-bar', categoryName: 'Magnetic Separator' },
  { name: 'Magnetic Grill', slug: 'magnetic-grill', categoryName: 'Magnetic Separator' },
  { name: 'Magnetic Liquid Trap', slug: 'magnetic-liquid-trap', categoryName: 'Magnetic Separator' },
  { name: 'Drawer Magnet', slug: 'drawer-magnet', categoryName: 'Magnetic Separator' },
  { name: 'Magnetic Roll Separator', slug: 'magnetic-roll-separator', categoryName: 'Magnetic Separator' },
  { name: 'Magnetic Plate', slug: 'magnetic-plate', categoryName: 'Magnetic Separator' },
  { name: 'Magnetic Sheet Separator', slug: 'magnetic-sheet-separator', categoryName: 'Magnetic Separator' }
]

const productData = [
  {
    name: 'Neodymium Disc Magnets',
    slug: 'neodymium-disc-magnets',
    description: `
    Neodymium disc magnets are powerful permanent magnets made from an alloy of neodymium, iron, and boron. These magnets are known for their exceptional strength and versatility, making them ideal for various industrial and commercial applications.

    Key features:
    - High magnetic strength-to-size ratio
    - Excellent resistance to demagnetization
    - Suitable for high-temperature applications (up to 80°C)
    - Available in various sizes and grades

    Common applications include:
    - Motors and generators
    - Magnetic separators
    - Sensors and actuators
    - Magnetic therapy devices
    - Automotive industry components

    Our neodymium disc magnets are manufactured to the highest quality standards, ensuring consistent performance and long-lasting magnetization. Contact us for custom sizes or specific grade requirements.
    `,
    weightRange: '1g - 500g',
    priceRange: 'Rp. 10.000 - Rp. 500.000',
    stock: 1000,
    categoryName: 'Rare Earth Magnets',
    subCategoryName: 'Neodymium Magnets',
    ProductImages: [
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722437599/karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt.png',
        publicUrl: 'karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253009/karyaciptamagnet/products/jdrwk4bycjbexpiux0dc.png',
        publicUrl: 'karyaciptamagnet/products/jdrwk4bycjbexpiux0dc'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253008/karyaciptamagnet/products/azzqf3iezd0ghlzctuzq.png',
        publicUrl: 'karyaciptamagnet/products/azzqf3iezd0ghlzctuzq'
      },
    ]
  },
  {
    name: 'Flexible Magnetic Sheets',
    slug: 'flexible-magnetic-sheets',
    description: `
    Flexible magnetic sheets are versatile and adaptable magnetic materials that can be easily cut, shaped, and applied to various surfaces. These sheets combine the properties of magnets with the flexibility of rubber or plastic, making them ideal for a wide range of applications.

    Key features:
    - Flexible and easy to manipulate
    - Can be cut with scissors or die-cut into custom shapes
    - Available in different thicknesses and magnetic strengths
    - Often supplied with an adhesive backing for easy application

    Common applications include:
    - Signage and displays
    - Craft projects and DIY
    - Refrigerator magnets
    - Vehicle signage
    - Educational materials

    Our flexible magnetic sheets are manufactured using high-quality materials to ensure durability and consistent magnetic properties. They can be customized to meet specific project requirements.
    `,
    weightRange: '100g - 5kg',
    priceRange: 'Rp. 50.000 - Rp. 1.000.000',
    stock: 500,
    categoryName: 'Flexible Magnets',
    subCategoryName: 'Magnetic Sheets',
    ProductImages: [
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253009/karyaciptamagnet/products/jdrwk4bycjbexpiux0dc.png',
        publicUrl: 'karyaciptamagnet/products/jdrwk4bycjbexpiux0dc'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722437599/karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt.png',
        publicUrl: 'karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253008/karyaciptamagnet/products/azzqf3iezd0ghlzctuzq.png',
        publicUrl: 'karyaciptamagnet/products/azzqf3iezd0ghlzctuzq'
      },
    ]
  },
  {
    name: 'Magnetic Hooks',
    slug: 'magnetic-hooks',
    description: `
    Magnetic hooks are innovative and convenient fastening solutions that combine the strength of magnets with the functionality of hooks. These versatile devices offer a quick and easy way to hang items without the need for drilling or permanent fixtures.

    Key features:
    - Strong neodymium magnet base for secure attachment
    - Durable hook design for holding various items
    - Available in different sizes and weight capacities
    - Ideal for both temporary and semi-permanent installations

    Common applications include:
    - Kitchen organization
    - Garage tool storage
    - Office supply management
    - Retail display setups
    - Temporary event decorations

    Our magnetic hooks are engineered to provide reliable performance and long-lasting durability. They offer a clean and damage-free alternative to traditional hanging methods, making them perfect for renters or those who frequently rearrange their spaces.
    `,
    weightRange: '50g - 500g',
    priceRange: 'Rp. 25.000 - Rp. 250.000',
    stock: 750,
    categoryName: 'Magnetic Assembly',
    subCategoryName: 'Magnetic Hooks',
    ProductImages: [
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253008/karyaciptamagnet/products/azzqf3iezd0ghlzctuzq.png',
        publicUrl: 'karyaciptamagnet/products/azzqf3iezd0ghlzctuzq'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722437599/karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt.png',
        publicUrl: 'karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253009/karyaciptamagnet/products/jdrwk4bycjbexpiux0dc.png',
        publicUrl: 'karyaciptamagnet/products/jdrwk4bycjbexpiux0dc'
      },
    ]
  },
  {
    name: 'Magnetic Separator Bars',
    slug: 'magnetic-separator-bars',
    description: `
    Magnetic separator bars are essential tools in various industries for removing ferrous contaminants from dry, free-flowing materials. These powerful magnetic devices help ensure product purity, protect processing equipment, and maintain high-quality standards in production lines.

    Key features:
    - High-strength rare earth magnets for superior separation
    - Durable stainless steel construction
    - Available in various lengths and magnetic strengths
    - Easy to install and clean

    Common applications include:
    - Food processing
    - Pharmaceutical manufacturing
    - Plastics and rubber production
    - Recycling facilities
    - Mining and aggregate industries

    Our magnetic separator bars are designed to provide efficient and reliable ferrous metal removal in challenging industrial environments. They can be customized to fit specific processing equipment and material flow requirements, ensuring optimal performance and product safety.
    `,
    weightRange: '1kg - 50kg',
    priceRange: 'Rp. 1.000.000 - Rp. 20.000.000',
    stock: 100,
    categoryName: 'Magnetic Separator',
    subCategoryName: 'Magnetic Bar',
    ProductImages: [
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722437599/karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt.png',
        publicUrl: 'karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253009/karyaciptamagnet/products/jdrwk4bycjbexpiux0dc.png',
        publicUrl: 'karyaciptamagnet/products/jdrwk4bycjbexpiux0dc'
      },
      {
        imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253008/karyaciptamagnet/products/azzqf3iezd0ghlzctuzq.png',
        publicUrl: 'karyaciptamagnet/products/azzqf3iezd0ghlzctuzq'
      },
    ]
  },
]

async function seed() {
  console.log('Start seeding...')

  // Create categories
  for (const category of categoryData) {
    const existingCategory = await prisma.productCategory.findUnique({
      where: { name: category.name }
    })
    if (!existingCategory) {
      const createdCategory = await prisma.productCategory.create({
        data: category
      })
      console.log(`Created category with id: ${createdCategory.productCategoryId}`)
    } else {
      console.log(`Category ${category.name} already exists, skipping...`)
    }
  }

  // Create subcategories
  for (const subCategory of subCategoryData) {
    const category = await prisma.productCategory.findUnique({
      where: { name: subCategory.categoryName }
    })
    if (category) {
      const createdSubCategory = await prisma.productSubCategory.create({
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          productCategoryId: category.productCategoryId
        }
      })
      console.log(`Created subcategory with id: ${createdSubCategory.productSubCategoryId}`)
    }
  }

  // Create products
  for (const product of productData) {
    const category = await prisma.productCategory.findUnique({
      where: { name: product.categoryName }
    })
    const subCategory = await prisma.productSubCategory.findFirst({
      where: { 
        name: product.subCategoryName,
        productCategoryId: category?.productCategoryId
      }
    })

    if (category && subCategory) {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          weightRange: product.weightRange,
          priceRange: product.priceRange,
          stock: product.stock,
          productCategoryId: category.productCategoryId,
          productSubCategoryId: subCategory.productSubCategoryId,
          ProductImages: {
            create: product.ProductImages
          }
        },
        include: {
          ProductImages: true
        }
      })
      console.log(`Created product with id: ${createdProduct.productId}`)
    } else {
      console.log(`Skipped product ${product.name} due to missing category or subcategory`)
    }
  }

  console.log('Seeding finished.')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })