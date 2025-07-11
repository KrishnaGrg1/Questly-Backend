import Joi from 'joi';

const GoalCategoryValues = [
  'Fitness',
  'MentalHealth',
  'Education',
  'Career',
  'Programming',
  'Lifestyle',
  'Finance',
  'Creativity',
  'Social',
];

const GoalValidation = {
  submitGoal: {
    body: Joi.object().keys({
      title: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must not exceed 100 characters',
      }),
      category: Joi.string()
        .valid(...GoalCategoryValues)
        .required()
        .messages({
          'any.only': `Category must be one of: ${GoalCategoryValues.join(', ')}`,
          'string.empty': 'Category is required',
        }),
      selfRating: Joi.number().integer().min(0).max(10).optional().messages({
        'number.base': 'Self rating must be a number',
        'number.min': 'Self rating cannot be less than 0',
        'number.max': 'Self rating cannot be more than 10',
        'number.integer': 'Self rating must be an integer',
      }),
    }),
  },
};

export default GoalValidation;
