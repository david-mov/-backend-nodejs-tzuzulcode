const {Router} = require('express')
const JobsService = require('../services/jobs')

function jobs(app) {

    const jobsService = new JobsService()

    const router = Router()
    app.use('/api/jobs', router)

    router.get('/', async (req, res) => {
        const jobs = await jobsService.getAll()
        const status = typeof jobs === 'object' && jobs.error ? 400 : 200
        return res.status(status).json(jobs)
    })

    router.get('/:sector', async (req, res) => {
        const job = await jobsService.getBySector(req.params.sector)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })

    router.post('/', async (req, res) => {
        const job = await jobsService.create(req.body)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })

    router.put('/:id', async (req, res) => {
        const job = await jobsService.update(req.params.id, req.body)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })

    router.delete('/:id', async (req, res) => {
        const job = await jobsService.delete(req.params.id)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })
}

module.exports = jobs