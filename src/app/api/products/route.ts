import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const where = {
    ...(category && { productCategory: { name: category } }),
    ...(subcategory && { productSubCategory: { name: subcategory } }),
  };

  try {
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          ProductImages: true,
          productCategory: true,
          productSubCategory: true,
        },
        skip,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    return NextResponse.json({ products, totalCount, totalPages });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}