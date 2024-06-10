#!/usr/bin/env sh

if [ -z ${AWS_ACCESS_KEY_ID} ]; then echo "Required environment var AWS_ACCESS_KEY_ID not set"; exit 1; fi
if [ -z ${AWS_SECRET_ACCESS_KEY} ]; then echo "Required environment var AWS_SECRET_ACCESS_KEY not set"; exit 1; fi
if [ -z ${AWS_DEFAULT_REGION} ]; then echo "Required environment var AWS_DEFAULT_REGION not set"; exit 1; fi
if [ -z ${S3_BUCKET_NAME} ]; then echo "Required environment var S3_BUCKET_NAME not set"; exit 1; fi

npm install || exit 1
npm run build-storybook || exit 1
aws s3 sync ./storybook-static s3://${S3_BUCKET_NAME}
