export type ImageUrl = {
    url: string
    public_id: string
}

export type IProduct = {
    id: string
    name: string
    description: string
    imageUrl: ImageUrl[]
    price: number
    stock: number
    weight: number
    discount: number
    createdAt: Date
    updatedAt: Date
}

export type ICart = {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    items: ICartItem[]
}

export type ICartItem = {
    id: string
    cartId: string
    productId: string
    quantity: number
    createdAt: Date
    updatedAt: Date
}

export type IUser = {
    id: string
    username: string
    name: string
    password: string
    email: string
    emailVerified: Date
    image: ImageUrl
    phoneNumber: string
    fullAddress: string
    provinceId: string
    cityId: string
    provinces: IProvince | undefined
    city: ICity | undefined
    scope: string
}

export type IProvince = {
    id: string
    name: string
}

export type ICity = {
    id: string
    name: string
    provinceId: string
    province: IProvince
}

export type IOrder = {
    id: string
    userId: string
    cartId: string
    paymentStatus: string
    shippingStatus: string
    shippingAddress: string
    shippingCourier: string
    shippingCost: number
    snapToken: string
    snapRedirectUrl: string
    totalPrice: number
    createdAt: Date
    updatedAt: Date
    user: IUser
    cart: ICart
}

export type IInvoice = {
    id: string
    userId: string
    orderId: string
    phoneNumber: string
    paymentStatus: string
    shippingStatus: string
    shippingAddress: string
    shippingCourier: string
    shippingCost: number
    totalPrice: number
    weight: number
    createdAt: Date
    updatedAt: Date
    user: IUser
    order: IOrder
}