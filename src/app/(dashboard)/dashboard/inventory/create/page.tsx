import FormAddProduct from "@/app/(dashboard)/components/FormAddProduct";
import Breadcrumbs from "@/app/(dashboard)/components/Breadcrumbs";
import {
  fetchCategories,
  fetchSubCategories,
} from "@/app/(dashboard)/data/data";

export default async function Page() {
  const [productCategories, productSubCategories] = await Promise.all([
    fetchCategories(),
    fetchSubCategories(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Inventory", href: "/dashboard/inventory" },
          {
            label: "Create Product",
            href: "/dashboard/inventory/create",
            active: true,
          },
        ]}
      />
      <FormAddProduct
        productCategories={productCategories}
        productSubCategories={productSubCategories}
      />
    </main>
  );
}
