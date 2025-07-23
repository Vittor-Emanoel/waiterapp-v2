import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class GetPresignedUrlUseCase {
  constructor(
    private readonly s3Client: S3Client,
    private readonly bucketName: string,
    private readonly expiresIn = 60
  ) {}

  async execute(fileKey: string) {
    try {
      const s3command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      return await getSignedUrl(this.s3Client, s3command, {
        expiresIn: this.expiresIn,
      });
    } catch (error) {
      throw error;
    }
  }
}
