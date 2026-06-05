import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Garante compatibilidade ideal de rotas com R2
});
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, fileName, fileType } = body;

    if (!userId || !fileName || !fileType) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }
    const objectKey = `users/${userId}/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: objectKey,
      ChecksumAlgorithm: undefined,
    });
    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 180,
      signableHeaders: new Set(),
    });

    return NextResponse.json({ presignedUrl, objectKey });
  } catch (error) {
    console.error("Erro no R2:", error);
    return NextResponse.json(
      { error: "Erro ao gerar link de upload" },
      { status: 500 },
    );
  }
}
