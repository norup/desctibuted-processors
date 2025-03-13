import * as Joi from 'joi';

export const validationSchema = Joi.object({
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().default(5432),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
  TYPEORM_MIGRATIONS_RUN: Joi.boolean().default(false),
  TYPEORM_LOGGING: Joi.boolean().default(false),
});
