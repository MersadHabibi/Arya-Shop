import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        BACKEND_URL: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_BACKEND_URL: z.string().url(),
        NEXT_PUBLIC_IMAGE_URL: z.string().url(),
    },
    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    },
});