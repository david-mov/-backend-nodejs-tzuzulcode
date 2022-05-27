const {Router} = require('express')
const JobsService = require('../services/jobs')
const {isAuthenticated, verifyPermission} = require('../middlewares/authValidation')

function jobs(app) {

    const jobsService = new JobsService()

    const router = Router()
    app.use('/api/jobs', router)

    router.get('/', isAuthenticated, verifyPermission(1), async (req, res) => {
        const jobs = await jobsService.getAll()
        const status = typeof jobs === 'object' && jobs.error ? 400 : 200
        return res.status(status).json(jobs)
    })

    router.get('/:sector', isAuthenticated, verifyPermission(1), async (req, res) => {
        const job = await jobsService.getBySector(req.params.sector)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })

    router.post('/', isAuthenticated, verifyPermission(2), async (req, res) => {
        const job = await jobsService.create(req.body, req.user.data.id)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })

    router.put('/:id', isAuthenticated, verifyPermission(2), async (req, res) => {
        const job = await jobsService.update(req.params.id, req.body)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })

    router.delete('/:id', isAuthenticated, verifyPermission(2), async (req, res) => {
        const job = await jobsService.delete(req.params.id)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })

    router.put('/apply/:jobId', isAuthenticated, verifyPermission(1), async (req, res) => {
        const job = await jobsService.apply(req.params.jobId, req.user.data.id)
        const status = job && job.error ? 400 : 200
        return res.status(status).json(job)
    })
}

module.exports = jobs