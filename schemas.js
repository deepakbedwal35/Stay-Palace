const Joi = require("joi")

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required()
  }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
  }).required()
})

module.exports.userSchema = Joi.object({
  user : Joi.object({
    username : Joi.string().required()

  })

})