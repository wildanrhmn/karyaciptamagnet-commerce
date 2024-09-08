export interface ImageUrl {
  url: string;
  public_id: string;
}

export interface IProduct {
  id: string;
  name: string;
  image: ImageUrl[];
  desc: string;
}

export interface ICartData {
  allItemsPriced: boolean;
  cartId: string;
  createdAt: string;
  items: Array<{
    cartId: string;
    cartItemId: string;
    customization: string | null;
    finalPrice: number | null;
    product: {
      ProductImages: Array<{
        imageUrl: string;
        productId: string;
        productImageId: string;
        publicUrl: string;
      }>;
      createdAt: string;
      description: string;
      name: string;
      orderCount: number;
      priceRange: string;
      productCategory: {
        createdAt: string;
        name: string;
        productCategoryId: string;
        slug: string;
        updatedAt: string;
      };
      productCategoryId: string;
      productId: string;
      productSubCategory: {
        createdAt: string;
        name: string;
        productCategoryId: string;
        productSubCategoryId: string;
        slug: string;
        updatedAt: string;
      };
      productSubCategoryId: string;
      slug: string;
      smallDescription: string;
      stock: number;
      updatedAt: string;
      weightRange: string;
    };
    productId: string;
    quantity: number;
  }>;
  itemsWithFinalPrice: number;
  status: string;
  totalPrice: number;
  updatedAt: string;
  userId: string;
}

export interface IUser {
  id: string;
  username: string;
  name: string;
  password: string;
  email: string;
  emailVerified: Date;
  image: ImageUrl;
  phoneNumber: string;
  addresses: {
    id: string;
    fullAddress: string;
    province: {
      id: string;
      name: string;
    };
    city: {
      id: string;
      name: string;
    };
  };
  scope: string;
}

export interface IProvince {
  id: string;
  name: string;
}

export interface ICity {
  id: string;
  name: string;
  provinceId: string;
  province: IProvince;
}

export interface IOrder {
  id: string;
  userId: string;
  cartId: string;
  paymentStatus: string;
  shippingStatus: string;
  shippingAddress: string;
  shippingCourier: string;
  shippingCost: number;
  snapToken: string;
  snapRedirectUrl: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  cart: ICartData;
}

export interface IInvoice {
  id: string;
  userId: string;
  orderId: string;
  phoneNumber: string;
  paymentStatus: string;
  shippingStatus: string;
  shippingAddress: string;
  shippingCourier: string;
  shippingCost: number;
  totalPrice: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  order: IOrder;
}

export interface LoginForm {
  username: string;
  password: string;
}
