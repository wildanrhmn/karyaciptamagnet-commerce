import { prisma } from "@/lib/db/prisma";

const productData = [
  {
    name: 'Round Magnets',
    description: `
    <h2>Round Magnets: Versatile and Powerful</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
      </p>
      <h3>Key Features:</h3>
      <ul>
        <li>Strong magnetic force</li>
        <li>Perfect circular shape</li>
        <li>Various sizes available</li>
        <li>Multiple applications</li>
      </ul>
      <p>
        Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
      </p>
      <h3>Applications:</h3>
      <p>
        Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
      </p>
    `,
    weightRange: '100g - 1kg',
    priceRange: 'Rp. 1000 - Rp. 100.000',
    stock: 100,
    category: 'Rare Earth Magnets',
    subcategory: 'Neodymium Magnets',
    ProductImages: {
      create: [
        {
          imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253010/karyaciptamagnet/products/cn53zv0ucjtzuwuynltp.png',
          publicUrl: 'karyaciptamagnet/products/cn53zv0ucjtzuwuynltp'
        },
        {
          imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253009/karyaciptamagnet/products/jdrwk4bycjbexpiux0dc.png',
          publicUrl: 'karyaciptamagnet/products/jdrwk4bycjbexpiux0dc'
        },
        {
          imageUrl: 'https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253008/karyaciptamagnet/products/azzqf3iezd0ghlzctuzq.png',
          publicUrl: 'karyaciptamagnet/products/azzqf3iezd0ghlzctuzq'
        }
      ]
    }
  },
]

async function seed() {
  console.log('Start seeding...')

  for (const product of productData) {
    const createdProduct = await prisma.product.create({
      data: product,
      include: {
        ProductImages: true
      }
    })
    console.log(`Created product with id: ${createdProduct.productId}`)
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