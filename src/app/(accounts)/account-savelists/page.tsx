import ProductCard from "@/components/ProductCard";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/db/prisma";

async function getWishlist() {
  try {
    const session = await auth();
    const wishlist = await prisma.userWishlist.findMany({
      where: {
        userId: session?.user.id,
      },
      select: {
        products: {
          include: {
            ProductImages: true,
            productCategory: true,
            productSubCategory: true,
          },
        },
      },
    });
    return wishlist;
  } catch (error) {
    console.error(error);
  }
}
const AccountSavelists = async () => {
  const wishlists = await getWishlist();
  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Wishlist Anda
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {wishlists!.map((wishlist) => (
            <ProductCard key={wishlist.products.productId} data={wishlist.products} />
          ))}
        </div>
        <div className="flex !mt-20 justify-center items-center">
          <ButtonSecondary loading>Show me more</ButtonSecondary>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
