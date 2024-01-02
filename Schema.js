const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.object({
            url:joi.string().allow("",null),
            filename:joi.string().allow("",null)
        }).allow("",null),
        // image:joi.string(),
        owner:joi.object({
            _id:joi.string()
        }),
        category:joi.string()


    }).required()
})


module.exports.reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().required(),
        review: joi.number().required().min(0).max(5)
    })
})

