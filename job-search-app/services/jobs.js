const {JobModel} = require('../models')

class JobsService {

    async getAll() {
        try {
            const jobs = await JobModel.find({})
            return jobs
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async getBySector(sector) {
        try {
            const job = await JobModel.findOne({sector}).exec()
            return job
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async create(jobData) {
        try {
            const job = await JobModel.create(jobData)
            return job
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async update(id, jobData) {
        try {
            const job = await JobModel.findByIdAndUpdate(id, jobData)
            return job
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

    async delete(id) {
        try {
            const job = await JobModel.findByIdAndDelete(id)
            return job
        } catch(err) {
            console.log(err)
            return ({
                error: true,
                info: err
            })
        }
    }

}

module.exports = JobsService