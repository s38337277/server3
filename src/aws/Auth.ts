import AWS from 'aws-sdk';

const accessKeyId: string = "AKIA5FTZD6UDKOBFJDY3"
const secretAccessKey: string = "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"
const region: string = "us-east-2"


AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
});

export const s3 = new AWS.S3();


/*
async function verifyS3Connection() {
    try {
        // Listar los buckets
        const data = await s3.listBuckets().promise();

        return data.Buckets

    } catch (error) {
        console.error('Error al verificar la conexión:', error);
    }
}
*/
