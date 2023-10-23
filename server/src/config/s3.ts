import AWS from 'aws-sdk'

interface IUploadParams {
	s3ObjectKey: string
	s3Bucket: string
}

export const generatePreSignedGetUrl = async (payload: IUploadParams) => {
	try {
		console.log(JSON.stringify(`[GET S3 DOWNLOAD URL SERVICE] ${JSON.stringify(payload)}`))

		const { s3ObjectKey, s3Bucket } = payload

		const URL_EXPIRATION_TIME = 60000

		const myBucket = new AWS.S3({
			signatureVersion: 'v4',
			params: { Bucket: s3Bucket },
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.REGION,
		})
		return new Promise((resolve, reject) => {
			myBucket.getSignedUrl(
				'getObject',
				{
					Key: s3ObjectKey,

					Expires: URL_EXPIRATION_TIME,
				},
				(err, url) => {
					if (err) {
						console.log(err)
						return reject(err)
					}
					resolve(url) // API Response Here
				}
			)
		})
	} catch (error) {
		console.log(JSON.stringify(`[GET S3 DOWNLOAD URL SERVICE ERROR] ${JSON.stringify(error)}`))
	}
}

const URL_EXPIRATION_TIME = 600 // in seconds
const S3_BUCKET = process.env.S3_BUCKET

export const generatePreSignedPutUrl = async (payload: any) => {
	try {
		console.info(JSON.stringify(`[GET S3 UPLOAD URL SERVICE] ${JSON.stringify(payload)}`))

		const { fileType, s3ObjectKey } = payload

		const myBucket = new AWS.S3({
			signatureVersion: 'v4',
			params: { Bucket: S3_BUCKET },
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.REGION,
		})

		return new Promise((resolve, reject) => {
			myBucket.getSignedUrl(
				'putObject',
				{
					Key: s3ObjectKey,
					ContentType: fileType,
					Expires: URL_EXPIRATION_TIME,
				},
				(err, url) => {
					if (err) {
						console.error(err)

						return reject(err)
					} else {
						resolve(url) // API Response Here
					}
				}
			)
		})
	} catch (error: any) {
		console.info(JSON.stringify(`[GET S3 UPLOAD URL SERVICE ERROR] ${JSON.stringify(error)}`))
		throw new error()
	}
}
