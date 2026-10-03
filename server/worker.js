import { Worker } from 'bullmq'

const worker = new Worker(
    'File-upload-queue',
    async (job) => {
        console.log('Job received:', job.data)
    },
    {
        concurrency: 2,
        connection: {
            host: 'localhost',
            port: 6379,
            maxRetriesPerRequest: null
        }
    }
)

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`)
})

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err)
})