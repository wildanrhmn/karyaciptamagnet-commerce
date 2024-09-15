import { prisma } from "@/lib/db/prisma";

const productReviewData = [
    {
        productId: 'cm13jwq5i001dcdqcq018wstu',
        userId: 'cm13jyqv80000cdsokgcagxk1',
        review: 'Produk magnet dari CV Karya Cipta Magnet sangat berkualitas tinggi. Kekuatan magnetnya luar biasa dan tahan lama. Saya sangat puas dengan performa dan ketahanannya. Cocok untuk berbagai aplikasi industri maupun rumah tangga. Pelayanan pelanggan mereka juga sangat baik dan profesional. Sangat direkomendasikan!',
        rating: 5
    },
    {
        productId: 'cm13jwq5i001dcdqcq018wstu',
        userId: 'cm13jzn1i0001cdsof0naxc6n',
        review: 'Saya baru saja mencoba magnet dari CV Karya Cipta Magnet dan sangat terkesan. Kualitasnya benar-benar unggul, dengan daya tarik magnet yang kuat dan konsisten. Produk ini terbukti tahan lama dan cocok untuk berbagai kebutuhan, baik di industri maupun rumah tangga. Yang membuat saya lebih puas adalah layanan pelanggan mereka yang responsif dan membantu. Harga produk ini sepadan dengan kualitasnya. Saya pasti akan membeli lagi dan merekomendasikannya kepada rekan-rekan.',
        rating: 5
    },
    {
        productId: 'cm13jwq5i001dcdqcq018wstu',
        userId: 'cm13k05q10002cdsoqgpk42ga',
        review: 'Magnet dari CV Karya Cipta Magnet benar-benar mengagumkan! Saya menggunakannya untuk proyek DIY di rumah dan hasilnya luar biasa. Kekuatan magnetnya sangat konsisten dan tahan lama. Yang paling mengesankan adalah fleksibilitas penggunaannya - bisa dipakai untuk berbagai keperluan. Layanan pelanggan mereka juga sangat membantu ketika saya memiliki pertanyaan. Meski harganya sedikit lebih tinggi dari produk lain, kualitasnya benar-benar sepadan. Sangat merekomendasikan untuk siapa saja yang mencari magnet berkualitas tinggi!',
        rating: 4
    },
]

async function seedProductReviews() {
  console.log("Start seeding product reviews...");

  for (const review of productReviewData) {
    const existingReview = await prisma.productReview.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    if (!existingReview) {
      const createdReview = await prisma.productReview.create({
        data: review,
      });
      console.log(
        `Created product review with id: ${createdReview.productReviewId}`
      );
    } else {
      console.log(
        `Review for product ${review.productId} by user ${review.userId} already exists. Skipping.`
      );
    }
  }

  console.log("Product review seeding finished.");
}

// Call the seeding function
seedProductReviews()
  .catch((error) => {
    console.error("Error seeding product reviews:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
