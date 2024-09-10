import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
  AUTH_SECRET: zod.string().nonempty(),
  RAJAONGKIR_API_KEY: zod.string().nonempty(),
  RAJAONGKIR_API_BASEURL: zod.string().nonempty(),
  MIDTRANS_MERCHANT_ID: zod.string().nonempty(),
  MIDTRANS_CLIENT_KEY: zod.string().nonempty(),
  MIDTRANS_SERVER_KEY: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
