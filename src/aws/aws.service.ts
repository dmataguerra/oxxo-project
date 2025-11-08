import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: 'us-east-2',
        credentials: {
            accessKeyId: process.env.accesskey_bucket!,
            secretAccessKey: process.env.secretkey_bucket!,
        }
    })

    async uploadFile(file: Express.Multer.File) {
        try {
            const key = file.originalname;
            const url = "https://oxxo-project.s3.us-east-2.amazonaws.com/" + key;
            const bucket = 'oxxo-project';
            const command = new PutObjectCommand({
                Key: key,
                Body: file.buffer,
                Bucket: bucket,

            })
            await this.s3.send(command);
            return { url };
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw error;
        }
    }
}
