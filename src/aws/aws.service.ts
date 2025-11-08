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
    
    async uploadFile(file : Express.Multer.File){
        const key = file.originalname;
        const bucket = 'oxxo-project';
        const command = new PutObjectCommand({
            Key : key,
            Body : file.buffer,
            Bucket : bucket,

        })  
        const response = await this.s3.send(command);
        console.log(response);
        return response;
    }
}
