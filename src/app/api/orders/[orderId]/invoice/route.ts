import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/auth/auth';

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { orderId } = params;

  try {
    const order = await prisma.order.findUnique({
      where: { orderId },
      include: {
        user: true,
        cart: {
          include: {
            items: {
              include: { product: {
                include: {
                  ProductImages: true
                }
              } }
            }
          }
        },
        invoice: true,
      }
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    let invoice = order.invoice;

    if (!invoice) {
      invoice = await prisma.invoice.create({
        data: {
          orderId: order.orderId,
          userId: order.userId,
        }
      });
    }

    const invoiceData = {
      invoiceId: invoice.invoiceId,
      orderId: order.orderId,
      customerName: order.user.name,
      customerEmail: order.user.email,
      orderDate: order.createdAt,
      items: order.cart.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.finalPrice,
        imageUrl: item.product.ProductImages[0].imageUrl,
      })),
      totalPrice: order.totalPrice,
      shippingAddress: order.shippingAddress,
    };

    return NextResponse.json(invoiceData);
  } catch (error) {
    console.error('Error generating invoice:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}