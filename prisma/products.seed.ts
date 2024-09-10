import { prisma } from "@/lib/db/prisma";

export const categoryData = [
  { name: "Rare Earth Magnets", slug: "rare-earth-magnets" },
  { name: "Flexible Magnets", slug: "flexible-magnets" },
  { name: "Magnetic Assembly", slug: "magnetic-assembly" },
  { name: "Magnetic Separator", slug: "magnetic-separator" },
];

export const subCategoryData = [
  {
    name: "Neodymium Magnets",
    slug: "neodymium-magnets",
    categoryName: "Rare Earth Magnets",
  },
  {
    name: "Samarium Cobalts Magnet",
    slug: "samarium-cobalts-magnet",
    categoryName: "Rare Earth Magnets",
  },
  {
    name: "Wind Turbine Magnets",
    slug: "wind-turbine-magnets",
    categoryName: "Rare Earth Magnets",
  },
  {
    name: "PM Motor Magnets",
    slug: "pm-motor-magnets",
    categoryName: "Rare Earth Magnets",
  },
  {
    name: "Magnetic Sheets",
    slug: "magnetic-sheets",
    categoryName: "Flexible Magnets",
  },
  {
    name: "Magnetic Strips",
    slug: "magnetic-strips",
    categoryName: "Flexible Magnets",
  },
  {
    name: "Fridge Magnets",
    slug: "fridge-magnets",
    categoryName: "Flexible Magnets",
  },
  {
    name: "Magnetic Bracelet",
    slug: "magnetic-bracelet",
    categoryName: "Flexible Magnets",
  },
  {
    name: "Magnetic Educational Toys",
    slug: "magnetic-educational-toys",
    categoryName: "Flexible Magnets",
  },
  {
    name: "Magnetic White Board",
    slug: "magnetic-white-board",
    categoryName: "Flexible Magnets",
  },
  {
    name: "Magnetic Hooks",
    slug: "magnetic-hooks",
    categoryName: "Magnetic Assembly",
  },
  { name: "Pot Magnet", slug: "pot-magnet", categoryName: "Magnetic Assembly" },
  {
    name: "Rubber Coated Magnet",
    slug: "rubber-coated-magnet",
    categoryName: "Magnetic Assembly",
  },
  {
    name: "Magnetic Component",
    slug: "magnetic-component",
    categoryName: "Magnetic Assembly",
  },
  { name: "Magswitch", slug: "magswitch", categoryName: "Magnetic Assembly" },
  {
    name: "Magnetic Bar",
    slug: "magnetic-bar",
    categoryName: "Magnetic Separator",
  },
  {
    name: "Magnetic Grill",
    slug: "magnetic-grill",
    categoryName: "Magnetic Separator",
  },
  {
    name: "Magnetic Liquid Trap",
    slug: "magnetic-liquid-trap",
    categoryName: "Magnetic Separator",
  },
  {
    name: "Drawer Magnet",
    slug: "drawer-magnet",
    categoryName: "Magnetic Separator",
  },
  {
    name: "Magnetic Roll Separator",
    slug: "magnetic-roll-separator",
    categoryName: "Magnetic Separator",
  },
  {
    name: "Magnetic Plate",
    slug: "magnetic-plate",
    categoryName: "Magnetic Separator",
  },
  {
    name: "Magnetic Sheet Separator",
    slug: "magnetic-sheet-separator",
    categoryName: "Magnetic Separator",
  },
];

const productData = [
  {
    name: "Neodymium Disc Magnets",
    slug: "neodymium-disc-magnets",
    smallDescription:
      "Neodymium disc magnets are powerful permanent magnets made from an alloy of neodymium, iron, and boron. These magnets are known for their exceptional strength and versatility, making them ideal for various industrial and commercial applications.",
    description: `
        <p><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Neodymium disc magnets are powerful permanent magnets made from an alloy of neodymium, iron, and boron. These magnets are known for their exceptional strength and versatility, making them ideal for various industrial and commercial applications.&nbsp;</span></p>
        <p><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Key features:&nbsp;</span></p>
        <ul>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">High magnetic strength-to-size ratio</span></li>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Excellent resistance to de-magnetization</span></li>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Suitable for high-temperature applications (up to 80°C)</span></li>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Available in various sizes and grades&nbsp;</span></li>
        </ul>
        <p><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Common applications include:</span></p>
        <ul>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">&nbsp;Motors and generators</span></li>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Magnetic separators</span></li>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Sensors and actuators</span></li>
            <li><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Magnetic therapy devices&nbsp;</span></li>
            <li>
                <p><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Automotive industry components&nbsp;</span></p>
                <p>&nbsp;</p>
            </li>
        </ul>
        <p><span style="background-color:rgb(255,255,255);color:rgb(71,85,105);font-family:__Poppins_c3367d, __Poppins_Fallback_c3367d;font-size:14px;">Our neodymium disc magnets are manufactured to the highest quality standards, ensuring consistent performance and long-lasting magnetization. Contact us for custom sizes or specific grade requirements.</span></p>
    `,
    weight: 100,
    priceRange: "Rp. 10.000 - Rp. 500.000",
    stock: 1000,
    categoryName: "Rare Earth Magnets",
    subCategoryName: "Neodymium Magnets",
    ProductImages: [
      {
        imageUrl:
          "https://res.cloudinary.com/dbllvvcv5/image/upload/v1722437599/karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt.png",
        publicUrl: "karyaciptamagnet/products/ypugy9ggpbvs0sr4ffyt",
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253009/karyaciptamagnet/products/jdrwk4bycjbexpiux0dc.png",
        publicUrl: "karyaciptamagnet/products/jdrwk4bycjbexpiux0dc",
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dbllvvcv5/image/upload/v1722253008/karyaciptamagnet/products/azzqf3iezd0ghlzctuzq.png",
        publicUrl: "karyaciptamagnet/products/azzqf3iezd0ghlzctuzq",
      },
    ],
  },
];

async function seed() {
  console.log("Start seeding...");

  // Create categories
  for (const category of categoryData) {
    const existingCategory = await prisma.productCategory.findUnique({
      where: { name: category.name },
    });
    if (!existingCategory) {
      const createdCategory = await prisma.productCategory.create({
        data: category,
      });
      console.log(
        `Created category with id: ${createdCategory.productCategoryId}`
      );
    } else {
      console.log(`Category ${category.name} already exists, skipping...`);
    }
  }

  // Create subcategories
  for (const subCategory of subCategoryData) {
    const category = await prisma.productCategory.findUnique({
      where: { name: subCategory.categoryName },
    });
    if (category) {
      const createdSubCategory = await prisma.productSubCategory.create({
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          productCategoryId: category.productCategoryId,
        },
      });
      console.log(
        `Created subcategory with id: ${createdSubCategory.productSubCategoryId}`
      );
    }
  }

  // Create products
  for (const product of productData) {
    const category = await prisma.productCategory.findUnique({
      where: { name: product.categoryName },
    });
    const subCategory = await prisma.productSubCategory.findFirst({
      where: {
        name: product.subCategoryName,
        productCategoryId: category?.productCategoryId,
      },
    });

    if (category && subCategory) {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          smallDescription: product.smallDescription,
          description: product.description,
          weight: product.weight,
          priceRange: product.priceRange,
          stock: product.stock,
          productCategoryId: category.productCategoryId,
          productSubCategoryId: subCategory.productSubCategoryId,
          ProductImages: {
            create: product.ProductImages,
          },
        },
        include: {
          ProductImages: true,
        },
      });
      console.log(`Created product with id: ${createdProduct.productId}`);
    } else {
      console.log(
        `Skipped product ${product.name} due to missing category or subcategory`
      );
    }
  }

  console.log("Seeding finished.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
