const {mongoose: {Schema, model}} = require('../config/db')

const LocationSchema = new Schema({
    country: {type: String, required: true},
    postalCode: {type: String}
})

const ContactSchema = new Schema({
    website: {type: String},
    phone: {type: String}
})

const EducationSchema = new Schema({
    institution: {type: String, required: true},
    title: {type: String},
    discipline: {type: String},
    description: {type: String},
    startDate: {type: Date},
    endDate: {type: Date}
})

const ExperienceSchema = new Schema({
    position: {type: String, required: true},
    company: {type: String, required: true},
    jobType: {type: String, enum: ['fulltime', 'partime', 'flexible', 'autonomous', 'intership', 'temporal']},
    laboralSector: {type: String},
    country: {type: String},
    currentlyActive: {type: Boolean, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date}
})

const ProfileSchema = new Schema({
    laboralSector: {type: String, required: true},
    education: {type: EducationSchema, required: true},
    experience: {type: ExperienceSchema}
})


const UserModel = model('User', new Schema({
    fullName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {type: LocationSchema, required: true},
    contact: {type: ContactSchema},
    permissionLevel: {type: Number, required: true},
    profile: {type: ProfileSchema}

}))

const JobModel = model('Job', new Schema({
    name: {type: String, required: true},
    sector: {type: String, required: true},
    jobType: {
        type: String, 
        enum: ['fulltime', 'partime', 'flexible', 'autonomous', 'intership', 'temporal'], 
        required: true
    },
    description: {type: String},
    applicants: {type: Array, required: true},
    owner: {type: String, required: true}
}))

module.exports = {
    UserModel,
    JobModel
}