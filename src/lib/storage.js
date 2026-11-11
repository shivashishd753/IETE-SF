
import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

const {
  AWS_ENDPOINT_URL_S3,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} = process.env;

if (
  !AWS_ENDPOINT_URL_S3 ||
  !AWS_ACCESS_KEY_ID ||
  !AWS_SECRET_ACCESS_KEY ||
  !AWS_REGION
) {
  throw new Error("Neon Object Storage environment variables are missing.");
}

export const storage = new S3Client({
  endpoint: AWS_ENDPOINT_URL_S3,
  region: AWS_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const EVENT_MEDIA_BUCKET = "iete-event-media";
