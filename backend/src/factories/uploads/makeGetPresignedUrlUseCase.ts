import { s3Client } from "@/lib/s3Client";
import { GetPresignedUrlUseCase } from "@/useCases/uploads/GetPresignedUrlUseCase";

export function makeGetPresignedUrlUseCase() {
  const bucketName = process.env.AWS_BUCKET_NAME!;

  const getPresignedUrlUseCase = new GetPresignedUrlUseCase(
    s3Client,
    bucketName
  );

  return getPresignedUrlUseCase;
}
