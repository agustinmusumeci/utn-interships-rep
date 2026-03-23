import { z } from 'zod';
import type { Prisma } from '../generated/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const InternshipScalarFieldEnumSchema = z.enum(['id','arm','company_id','city','rrhh','interview_timetable','knowledge','requirements','payment','timetable','position','benefits','interns','workplace','modality','link','mail','observations']);

export const CareerScalarFieldEnumSchema = z.enum(['id','name','color']);

export const InternshipCareerScalarFieldEnumSchema = z.enum(['internship_id','career_id']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// INTERNSHIP SCHEMA
/////////////////////////////////////////

export const InternshipSchema = z.object({
  id: z.number().int(),
  arm: z.string(),
  company_id: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().nullable(),
  observations: z.string().nullable(),
})

export type Internship = z.infer<typeof InternshipSchema>

/////////////////////////////////////////
// CAREER SCHEMA
/////////////////////////////////////////

export const CareerSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
})

export type Career = z.infer<typeof CareerSchema>

/////////////////////////////////////////
// INTERNSHIP CAREER SCHEMA
/////////////////////////////////////////

export const InternshipCareerSchema = z.object({
  internship_id: z.number().int(),
  career_id: z.string(),
})

export type InternshipCareer = z.infer<typeof InternshipCareerSchema>

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// INTERNSHIP
//------------------------------------------------------

export const InternshipIncludeSchema: z.ZodType<Prisma.InternshipInclude> = z.object({
  Company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  internshipCareers: z.union([z.boolean(),z.lazy(() => InternshipCareerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InternshipCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const InternshipArgsSchema: z.ZodType<Prisma.InternshipDefaultArgs> = z.object({
  select: z.lazy(() => InternshipSelectSchema).optional(),
  include: z.lazy(() => InternshipIncludeSchema).optional(),
}).strict();

export const InternshipCountOutputTypeArgsSchema: z.ZodType<Prisma.InternshipCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InternshipCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InternshipCountOutputTypeSelectSchema: z.ZodType<Prisma.InternshipCountOutputTypeSelect> = z.object({
  internshipCareers: z.boolean().optional(),
}).strict();

export const InternshipSelectSchema: z.ZodType<Prisma.InternshipSelect> = z.object({
  id: z.boolean().optional(),
  arm: z.boolean().optional(),
  company_id: z.boolean().optional(),
  city: z.boolean().optional(),
  rrhh: z.boolean().optional(),
  interview_timetable: z.boolean().optional(),
  knowledge: z.boolean().optional(),
  requirements: z.boolean().optional(),
  payment: z.boolean().optional(),
  timetable: z.boolean().optional(),
  position: z.boolean().optional(),
  benefits: z.boolean().optional(),
  interns: z.boolean().optional(),
  workplace: z.boolean().optional(),
  modality: z.boolean().optional(),
  link: z.boolean().optional(),
  mail: z.boolean().optional(),
  observations: z.boolean().optional(),
  Company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  internshipCareers: z.union([z.boolean(),z.lazy(() => InternshipCareerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InternshipCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CAREER
//------------------------------------------------------

export const CareerIncludeSchema: z.ZodType<Prisma.CareerInclude> = z.object({
  internshipCareers: z.union([z.boolean(),z.lazy(() => InternshipCareerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CareerCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CareerArgsSchema: z.ZodType<Prisma.CareerDefaultArgs> = z.object({
  select: z.lazy(() => CareerSelectSchema).optional(),
  include: z.lazy(() => CareerIncludeSchema).optional(),
}).strict();

export const CareerCountOutputTypeArgsSchema: z.ZodType<Prisma.CareerCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CareerCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CareerCountOutputTypeSelectSchema: z.ZodType<Prisma.CareerCountOutputTypeSelect> = z.object({
  internshipCareers: z.boolean().optional(),
}).strict();

export const CareerSelectSchema: z.ZodType<Prisma.CareerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
  internshipCareers: z.union([z.boolean(),z.lazy(() => InternshipCareerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CareerCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INTERNSHIP CAREER
//------------------------------------------------------

export const InternshipCareerIncludeSchema: z.ZodType<Prisma.InternshipCareerInclude> = z.object({
  Internship: z.union([z.boolean(),z.lazy(() => InternshipArgsSchema)]).optional(),
  Career: z.union([z.boolean(),z.lazy(() => CareerArgsSchema)]).optional(),
}).strict();

export const InternshipCareerArgsSchema: z.ZodType<Prisma.InternshipCareerDefaultArgs> = z.object({
  select: z.lazy(() => InternshipCareerSelectSchema).optional(),
  include: z.lazy(() => InternshipCareerIncludeSchema).optional(),
}).strict();

export const InternshipCareerSelectSchema: z.ZodType<Prisma.InternshipCareerSelect> = z.object({
  internship_id: z.boolean().optional(),
  career_id: z.boolean().optional(),
  Internship: z.union([z.boolean(),z.lazy(() => InternshipArgsSchema)]).optional(),
  Career: z.union([z.boolean(),z.lazy(() => CareerArgsSchema)]).optional(),
}).strict()

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z.object({
  internships: z.union([z.boolean(),z.lazy(() => InternshipFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional(),
}).strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z.object({
  internships: z.boolean().optional(),
}).strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  internships: z.union([z.boolean(),z.lazy(() => InternshipFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const InternshipWhereInputSchema: z.ZodType<Prisma.InternshipWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InternshipWhereInputSchema), z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipWhereInputSchema), z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  arm: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  company_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rrhh: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  interview_timetable: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  knowledge: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requirements: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  payment: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  timetable: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  benefits: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  interns: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  workplace: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  modality: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  mail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  internshipCareers: z.lazy(() => InternshipCareerListRelationFilterSchema).optional(),
});

export const InternshipOrderByWithRelationInputSchema: z.ZodType<Prisma.InternshipOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  arm: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  rrhh: z.lazy(() => SortOrderSchema).optional(),
  interview_timetable: z.lazy(() => SortOrderSchema).optional(),
  knowledge: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  timetable: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  benefits: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
  workplace: z.lazy(() => SortOrderSchema).optional(),
  modality: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  mail: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  observations: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  Company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  internshipCareers: z.lazy(() => InternshipCareerOrderByRelationAggregateInputSchema).optional(),
});

export const InternshipWhereUniqueInputSchema: z.ZodType<Prisma.InternshipWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    arm: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    arm: z.string(),
  }),
])
.and(z.strictObject({
  id: z.number().int().optional(),
  arm: z.string().optional(),
  AND: z.union([ z.lazy(() => InternshipWhereInputSchema), z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipWhereInputSchema), z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  company_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rrhh: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  interview_timetable: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  knowledge: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requirements: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  payment: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  timetable: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  benefits: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  interns: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  workplace: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  modality: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  mail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  Company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  internshipCareers: z.lazy(() => InternshipCareerListRelationFilterSchema).optional(),
}));

export const InternshipOrderByWithAggregationInputSchema: z.ZodType<Prisma.InternshipOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  arm: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  rrhh: z.lazy(() => SortOrderSchema).optional(),
  interview_timetable: z.lazy(() => SortOrderSchema).optional(),
  knowledge: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  timetable: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  benefits: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
  workplace: z.lazy(() => SortOrderSchema).optional(),
  modality: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  mail: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  observations: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => InternshipCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InternshipAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InternshipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InternshipMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InternshipSumOrderByAggregateInputSchema).optional(),
});

export const InternshipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InternshipScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema), z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema), z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  arm: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  company_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  rrhh: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  interview_timetable: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  knowledge: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  requirements: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  payment: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  timetable: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  benefits: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  interns: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  workplace: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  modality: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  mail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  observations: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const CareerWhereInputSchema: z.ZodType<Prisma.CareerWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CareerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  internshipCareers: z.lazy(() => InternshipCareerListRelationFilterSchema).optional(),
});

export const CareerOrderByWithRelationInputSchema: z.ZodType<Prisma.CareerOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  internshipCareers: z.lazy(() => InternshipCareerOrderByRelationAggregateInputSchema).optional(),
});

export const CareerWhereUniqueInputSchema: z.ZodType<Prisma.CareerWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CareerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  internshipCareers: z.lazy(() => InternshipCareerListRelationFilterSchema).optional(),
}));

export const CareerOrderByWithAggregationInputSchema: z.ZodType<Prisma.CareerOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CareerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CareerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CareerMinOrderByAggregateInputSchema).optional(),
});

export const CareerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CareerScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CareerScalarWhereWithAggregatesInputSchema), z.lazy(() => CareerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CareerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CareerScalarWhereWithAggregatesInputSchema), z.lazy(() => CareerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const InternshipCareerWhereInputSchema: z.ZodType<Prisma.InternshipCareerWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InternshipCareerWhereInputSchema), z.lazy(() => InternshipCareerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipCareerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipCareerWhereInputSchema), z.lazy(() => InternshipCareerWhereInputSchema).array() ]).optional(),
  internship_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  career_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  Internship: z.union([ z.lazy(() => InternshipScalarRelationFilterSchema), z.lazy(() => InternshipWhereInputSchema) ]).optional(),
  Career: z.union([ z.lazy(() => CareerScalarRelationFilterSchema), z.lazy(() => CareerWhereInputSchema) ]).optional(),
});

export const InternshipCareerOrderByWithRelationInputSchema: z.ZodType<Prisma.InternshipCareerOrderByWithRelationInput> = z.strictObject({
  internship_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
  Internship: z.lazy(() => InternshipOrderByWithRelationInputSchema).optional(),
  Career: z.lazy(() => CareerOrderByWithRelationInputSchema).optional(),
});

export const InternshipCareerWhereUniqueInputSchema: z.ZodType<Prisma.InternshipCareerWhereUniqueInput> = z.object({
  internship_id_career_id: z.lazy(() => InternshipCareerInternship_idCareer_idCompoundUniqueInputSchema),
})
.and(z.strictObject({
  internship_id_career_id: z.lazy(() => InternshipCareerInternship_idCareer_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => InternshipCareerWhereInputSchema), z.lazy(() => InternshipCareerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipCareerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipCareerWhereInputSchema), z.lazy(() => InternshipCareerWhereInputSchema).array() ]).optional(),
  internship_id: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  career_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  Internship: z.union([ z.lazy(() => InternshipScalarRelationFilterSchema), z.lazy(() => InternshipWhereInputSchema) ]).optional(),
  Career: z.union([ z.lazy(() => CareerScalarRelationFilterSchema), z.lazy(() => CareerWhereInputSchema) ]).optional(),
}));

export const InternshipCareerOrderByWithAggregationInputSchema: z.ZodType<Prisma.InternshipCareerOrderByWithAggregationInput> = z.strictObject({
  internship_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InternshipCareerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InternshipCareerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InternshipCareerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InternshipCareerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InternshipCareerSumOrderByAggregateInputSchema).optional(),
});

export const InternshipCareerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InternshipCareerScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InternshipCareerScalarWhereWithAggregatesInputSchema), z.lazy(() => InternshipCareerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipCareerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipCareerScalarWhereWithAggregatesInputSchema), z.lazy(() => InternshipCareerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  internship_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  career_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  internships: z.lazy(() => InternshipListRelationFilterSchema).optional(),
});

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  internships: z.lazy(() => InternshipOrderByRelationAggregateInputSchema).optional(),
});

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  internships: z.lazy(() => InternshipListRelationFilterSchema).optional(),
}));

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional(),
});

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const InternshipCreateInputSchema: z.ZodType<Prisma.InternshipCreateInput> = z.strictObject({
  arm: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
  Company: z.lazy(() => CompanyCreateNestedOneWithoutInternshipsInputSchema),
  internshipCareers: z.lazy(() => InternshipCareerCreateNestedManyWithoutInternshipInputSchema).optional(),
});

export const InternshipUncheckedCreateInputSchema: z.ZodType<Prisma.InternshipUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  arm: z.string(),
  company_id: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
  internshipCareers: z.lazy(() => InternshipCareerUncheckedCreateNestedManyWithoutInternshipInputSchema).optional(),
});

export const InternshipUpdateInputSchema: z.ZodType<Prisma.InternshipUpdateInput> = z.strictObject({
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Company: z.lazy(() => CompanyUpdateOneRequiredWithoutInternshipsNestedInputSchema).optional(),
  internshipCareers: z.lazy(() => InternshipCareerUpdateManyWithoutInternshipNestedInputSchema).optional(),
});

export const InternshipUncheckedUpdateInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  internshipCareers: z.lazy(() => InternshipCareerUncheckedUpdateManyWithoutInternshipNestedInputSchema).optional(),
});

export const InternshipCreateManyInputSchema: z.ZodType<Prisma.InternshipCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  arm: z.string(),
  company_id: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
});

export const InternshipUpdateManyMutationInputSchema: z.ZodType<Prisma.InternshipUpdateManyMutationInput> = z.strictObject({
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const InternshipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CareerCreateInputSchema: z.ZodType<Prisma.CareerCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  internshipCareers: z.lazy(() => InternshipCareerCreateNestedManyWithoutCareerInputSchema).optional(),
});

export const CareerUncheckedCreateInputSchema: z.ZodType<Prisma.CareerUncheckedCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  internshipCareers: z.lazy(() => InternshipCareerUncheckedCreateNestedManyWithoutCareerInputSchema).optional(),
});

export const CareerUpdateInputSchema: z.ZodType<Prisma.CareerUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  internshipCareers: z.lazy(() => InternshipCareerUpdateManyWithoutCareerNestedInputSchema).optional(),
});

export const CareerUncheckedUpdateInputSchema: z.ZodType<Prisma.CareerUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  internshipCareers: z.lazy(() => InternshipCareerUncheckedUpdateManyWithoutCareerNestedInputSchema).optional(),
});

export const CareerCreateManyInputSchema: z.ZodType<Prisma.CareerCreateManyInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const CareerUpdateManyMutationInputSchema: z.ZodType<Prisma.CareerUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CareerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CareerUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCareerCreateInputSchema: z.ZodType<Prisma.InternshipCareerCreateInput> = z.strictObject({
  Internship: z.lazy(() => InternshipCreateNestedOneWithoutInternshipCareersInputSchema),
  Career: z.lazy(() => CareerCreateNestedOneWithoutInternshipCareersInputSchema),
});

export const InternshipCareerUncheckedCreateInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedCreateInput> = z.strictObject({
  internship_id: z.number().int(),
  career_id: z.string(),
});

export const InternshipCareerUpdateInputSchema: z.ZodType<Prisma.InternshipCareerUpdateInput> = z.strictObject({
  Internship: z.lazy(() => InternshipUpdateOneRequiredWithoutInternshipCareersNestedInputSchema).optional(),
  Career: z.lazy(() => CareerUpdateOneRequiredWithoutInternshipCareersNestedInputSchema).optional(),
});

export const InternshipCareerUncheckedUpdateInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateInput> = z.strictObject({
  internship_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  career_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCareerCreateManyInputSchema: z.ZodType<Prisma.InternshipCareerCreateManyInput> = z.strictObject({
  internship_id: z.number().int(),
  career_id: z.string(),
});

export const InternshipCareerUpdateManyMutationInputSchema: z.ZodType<Prisma.InternshipCareerUpdateManyMutationInput> = z.strictObject({
});

export const InternshipCareerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateManyInput> = z.strictObject({
  internship_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  career_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  internships: z.lazy(() => InternshipCreateNestedManyWithoutCompanyInputSchema).optional(),
});

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  internships: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
});

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  internships: z.lazy(() => InternshipUpdateManyWithoutCompanyNestedInputSchema).optional(),
});

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  internships: z.lazy(() => InternshipUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
});

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const CompanyScalarRelationFilterSchema: z.ZodType<Prisma.CompanyScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional(),
});

export const InternshipCareerListRelationFilterSchema: z.ZodType<Prisma.InternshipCareerListRelationFilter> = z.strictObject({
  every: z.lazy(() => InternshipCareerWhereInputSchema).optional(),
  some: z.lazy(() => InternshipCareerWhereInputSchema).optional(),
  none: z.lazy(() => InternshipCareerWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const InternshipCareerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InternshipCareerOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipCountOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  arm: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  rrhh: z.lazy(() => SortOrderSchema).optional(),
  interview_timetable: z.lazy(() => SortOrderSchema).optional(),
  knowledge: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  timetable: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  benefits: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
  workplace: z.lazy(() => SortOrderSchema).optional(),
  modality: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  mail: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  arm: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  rrhh: z.lazy(() => SortOrderSchema).optional(),
  interview_timetable: z.lazy(() => SortOrderSchema).optional(),
  knowledge: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  timetable: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  benefits: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
  workplace: z.lazy(() => SortOrderSchema).optional(),
  modality: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  mail: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipMinOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  arm: z.lazy(() => SortOrderSchema).optional(),
  company_id: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  rrhh: z.lazy(() => SortOrderSchema).optional(),
  interview_timetable: z.lazy(() => SortOrderSchema).optional(),
  knowledge: z.lazy(() => SortOrderSchema).optional(),
  requirements: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  timetable: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  benefits: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
  workplace: z.lazy(() => SortOrderSchema).optional(),
  modality: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  mail: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipSumOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const CareerCountOrderByAggregateInputSchema: z.ZodType<Prisma.CareerCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
});

export const CareerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CareerMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
});

export const CareerMinOrderByAggregateInputSchema: z.ZodType<Prisma.CareerMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipScalarRelationFilterSchema: z.ZodType<Prisma.InternshipScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => InternshipWhereInputSchema).optional(),
  isNot: z.lazy(() => InternshipWhereInputSchema).optional(),
});

export const CareerScalarRelationFilterSchema: z.ZodType<Prisma.CareerScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CareerWhereInputSchema).optional(),
  isNot: z.lazy(() => CareerWhereInputSchema).optional(),
});

export const InternshipCareerInternship_idCareer_idCompoundUniqueInputSchema: z.ZodType<Prisma.InternshipCareerInternship_idCareer_idCompoundUniqueInput> = z.strictObject({
  internship_id: z.number(),
  career_id: z.string(),
});

export const InternshipCareerCountOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipCareerCountOrderByAggregateInput> = z.strictObject({
  internship_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipCareerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipCareerAvgOrderByAggregateInput> = z.strictObject({
  internship_id: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipCareerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipCareerMaxOrderByAggregateInput> = z.strictObject({
  internship_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipCareerMinOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipCareerMinOrderByAggregateInput> = z.strictObject({
  internship_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipCareerSumOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipCareerSumOrderByAggregateInput> = z.strictObject({
  internship_id: z.lazy(() => SortOrderSchema).optional(),
});

export const InternshipListRelationFilterSchema: z.ZodType<Prisma.InternshipListRelationFilter> = z.strictObject({
  every: z.lazy(() => InternshipWhereInputSchema).optional(),
  some: z.lazy(() => InternshipWhereInputSchema).optional(),
  none: z.lazy(() => InternshipWhereInputSchema).optional(),
});

export const InternshipOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InternshipOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CompanyCreateNestedOneWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutInternshipsInput> = z.strictObject({
  create: z.union([ z.lazy(() => CompanyCreateWithoutInternshipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutInternshipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutInternshipsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
});

export const InternshipCareerCreateNestedManyWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerCreateNestedManyWithoutInternshipInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyInternshipInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
});

export const InternshipCareerUncheckedCreateNestedManyWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedCreateNestedManyWithoutInternshipInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyInternshipInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const CompanyUpdateOneRequiredWithoutInternshipsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutInternshipsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CompanyCreateWithoutInternshipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutInternshipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutInternshipsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutInternshipsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutInternshipsInputSchema), z.lazy(() => CompanyUpdateWithoutInternshipsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutInternshipsInputSchema) ]).optional(),
});

export const InternshipCareerUpdateManyWithoutInternshipNestedInputSchema: z.ZodType<Prisma.InternshipCareerUpdateManyWithoutInternshipNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutInternshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyInternshipInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutInternshipInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutInternshipInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipCareerScalarWhereInputSchema), z.lazy(() => InternshipCareerScalarWhereInputSchema).array() ]).optional(),
});

export const InternshipCareerUncheckedUpdateManyWithoutInternshipNestedInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateManyWithoutInternshipNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutInternshipInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutInternshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyInternshipInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutInternshipInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutInternshipInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipCareerScalarWhereInputSchema), z.lazy(() => InternshipCareerScalarWhereInputSchema).array() ]).optional(),
});

export const InternshipCareerCreateNestedManyWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerCreateNestedManyWithoutCareerInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
});

export const InternshipCareerUncheckedCreateNestedManyWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedCreateNestedManyWithoutCareerInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
});

export const InternshipCareerUpdateManyWithoutCareerNestedInputSchema: z.ZodType<Prisma.InternshipCareerUpdateManyWithoutCareerNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutCareerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutCareerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutCareerInputSchema), z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutCareerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipCareerScalarWhereInputSchema), z.lazy(() => InternshipCareerScalarWhereInputSchema).array() ]).optional(),
});

export const InternshipCareerUncheckedUpdateManyWithoutCareerNestedInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateManyWithoutCareerNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema).array(), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => InternshipCareerCreateOrConnectWithoutCareerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => InternshipCareerUpsertWithWhereUniqueWithoutCareerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipCareerWhereUniqueInputSchema), z.lazy(() => InternshipCareerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => InternshipCareerUpdateWithWhereUniqueWithoutCareerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutCareerInputSchema), z.lazy(() => InternshipCareerUpdateManyWithWhereWithoutCareerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipCareerScalarWhereInputSchema), z.lazy(() => InternshipCareerScalarWhereInputSchema).array() ]).optional(),
});

export const InternshipCreateNestedOneWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipCreateNestedOneWithoutInternshipCareersInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCreateWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutInternshipCareersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InternshipCreateOrConnectWithoutInternshipCareersInputSchema).optional(),
  connect: z.lazy(() => InternshipWhereUniqueInputSchema).optional(),
});

export const CareerCreateNestedOneWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerCreateNestedOneWithoutInternshipCareersInput> = z.strictObject({
  create: z.union([ z.lazy(() => CareerCreateWithoutInternshipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutInternshipCareersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CareerCreateOrConnectWithoutInternshipCareersInputSchema).optional(),
  connect: z.lazy(() => CareerWhereUniqueInputSchema).optional(),
});

export const InternshipUpdateOneRequiredWithoutInternshipCareersNestedInputSchema: z.ZodType<Prisma.InternshipUpdateOneRequiredWithoutInternshipCareersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCreateWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutInternshipCareersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InternshipCreateOrConnectWithoutInternshipCareersInputSchema).optional(),
  upsert: z.lazy(() => InternshipUpsertWithoutInternshipCareersInputSchema).optional(),
  connect: z.lazy(() => InternshipWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InternshipUpdateToOneWithWhereWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUpdateWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUncheckedUpdateWithoutInternshipCareersInputSchema) ]).optional(),
});

export const CareerUpdateOneRequiredWithoutInternshipCareersNestedInputSchema: z.ZodType<Prisma.CareerUpdateOneRequiredWithoutInternshipCareersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CareerCreateWithoutInternshipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutInternshipCareersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CareerCreateOrConnectWithoutInternshipCareersInputSchema).optional(),
  upsert: z.lazy(() => CareerUpsertWithoutInternshipCareersInputSchema).optional(),
  connect: z.lazy(() => CareerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CareerUpdateToOneWithWhereWithoutInternshipCareersInputSchema), z.lazy(() => CareerUpdateWithoutInternshipCareersInputSchema), z.lazy(() => CareerUncheckedUpdateWithoutInternshipCareersInputSchema) ]).optional(),
});

export const InternshipCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipCreateNestedManyWithoutCompanyInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCreateWithoutCompanyInputSchema), z.lazy(() => InternshipCreateWithoutCompanyInputSchema).array(), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
});

export const InternshipUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUncheckedCreateNestedManyWithoutCompanyInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCreateWithoutCompanyInputSchema), z.lazy(() => InternshipCreateWithoutCompanyInputSchema).array(), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
});

export const InternshipUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.InternshipUpdateManyWithoutCompanyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCreateWithoutCompanyInputSchema), z.lazy(() => InternshipCreateWithoutCompanyInputSchema).array(), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => InternshipUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => InternshipUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => InternshipUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipScalarWhereInputSchema), z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
});

export const InternshipUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateManyWithoutCompanyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => InternshipCreateWithoutCompanyInputSchema), z.lazy(() => InternshipCreateWithoutCompanyInputSchema).array(), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => InternshipCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => InternshipUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema), z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => InternshipUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => InternshipUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipScalarWhereInputSchema), z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const CompanyCreateWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutInternshipsInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CompanyUncheckedCreateWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutInternshipsInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CompanyCreateOrConnectWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutInternshipsInput> = z.strictObject({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutInternshipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutInternshipsInputSchema) ]),
});

export const InternshipCareerCreateWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerCreateWithoutInternshipInput> = z.strictObject({
  Career: z.lazy(() => CareerCreateNestedOneWithoutInternshipCareersInputSchema),
});

export const InternshipCareerUncheckedCreateWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedCreateWithoutInternshipInput> = z.strictObject({
  career_id: z.string(),
});

export const InternshipCareerCreateOrConnectWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerCreateOrConnectWithoutInternshipInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema) ]),
});

export const InternshipCareerCreateManyInternshipInputEnvelopeSchema: z.ZodType<Prisma.InternshipCareerCreateManyInternshipInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => InternshipCareerCreateManyInternshipInputSchema), z.lazy(() => InternshipCareerCreateManyInternshipInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CompanyUpsertWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutInternshipsInput> = z.strictObject({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutInternshipsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutInternshipsInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutInternshipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutInternshipsInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
});

export const CompanyUpdateToOneWithWhereWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutInternshipsInput> = z.strictObject({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutInternshipsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutInternshipsInputSchema) ]),
});

export const CompanyUpdateWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutInternshipsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CompanyUncheckedUpdateWithoutInternshipsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutInternshipsInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCareerUpsertWithWhereUniqueWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUpsertWithWhereUniqueWithoutInternshipInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InternshipCareerUpdateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedUpdateWithoutInternshipInputSchema) ]),
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutInternshipInputSchema) ]),
});

export const InternshipCareerUpdateWithWhereUniqueWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUpdateWithWhereUniqueWithoutInternshipInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InternshipCareerUpdateWithoutInternshipInputSchema), z.lazy(() => InternshipCareerUncheckedUpdateWithoutInternshipInputSchema) ]),
});

export const InternshipCareerUpdateManyWithWhereWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUpdateManyWithWhereWithoutInternshipInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InternshipCareerUpdateManyMutationInputSchema), z.lazy(() => InternshipCareerUncheckedUpdateManyWithoutInternshipInputSchema) ]),
});

export const InternshipCareerScalarWhereInputSchema: z.ZodType<Prisma.InternshipCareerScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InternshipCareerScalarWhereInputSchema), z.lazy(() => InternshipCareerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipCareerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipCareerScalarWhereInputSchema), z.lazy(() => InternshipCareerScalarWhereInputSchema).array() ]).optional(),
  internship_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  career_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const InternshipCareerCreateWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerCreateWithoutCareerInput> = z.strictObject({
  Internship: z.lazy(() => InternshipCreateNestedOneWithoutInternshipCareersInputSchema),
});

export const InternshipCareerUncheckedCreateWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedCreateWithoutCareerInput> = z.strictObject({
  internship_id: z.number().int(),
});

export const InternshipCareerCreateOrConnectWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerCreateOrConnectWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema) ]),
});

export const InternshipCareerCreateManyCareerInputEnvelopeSchema: z.ZodType<Prisma.InternshipCareerCreateManyCareerInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => InternshipCareerCreateManyCareerInputSchema), z.lazy(() => InternshipCareerCreateManyCareerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const InternshipCareerUpsertWithWhereUniqueWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUpsertWithWhereUniqueWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InternshipCareerUpdateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedUpdateWithoutCareerInputSchema) ]),
  create: z.union([ z.lazy(() => InternshipCareerCreateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedCreateWithoutCareerInputSchema) ]),
});

export const InternshipCareerUpdateWithWhereUniqueWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUpdateWithWhereUniqueWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InternshipCareerUpdateWithoutCareerInputSchema), z.lazy(() => InternshipCareerUncheckedUpdateWithoutCareerInputSchema) ]),
});

export const InternshipCareerUpdateManyWithWhereWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUpdateManyWithWhereWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => InternshipCareerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InternshipCareerUpdateManyMutationInputSchema), z.lazy(() => InternshipCareerUncheckedUpdateManyWithoutCareerInputSchema) ]),
});

export const InternshipCreateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipCreateWithoutInternshipCareersInput> = z.strictObject({
  arm: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
  Company: z.lazy(() => CompanyCreateNestedOneWithoutInternshipsInputSchema),
});

export const InternshipUncheckedCreateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipUncheckedCreateWithoutInternshipCareersInput> = z.strictObject({
  id: z.number().int().optional(),
  arm: z.string(),
  company_id: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
});

export const InternshipCreateOrConnectWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipCreateOrConnectWithoutInternshipCareersInput> = z.strictObject({
  where: z.lazy(() => InternshipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InternshipCreateWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutInternshipCareersInputSchema) ]),
});

export const CareerCreateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerCreateWithoutInternshipCareersInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const CareerUncheckedCreateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerUncheckedCreateWithoutInternshipCareersInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const CareerCreateOrConnectWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerCreateOrConnectWithoutInternshipCareersInput> = z.strictObject({
  where: z.lazy(() => CareerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CareerCreateWithoutInternshipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutInternshipCareersInputSchema) ]),
});

export const InternshipUpsertWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipUpsertWithoutInternshipCareersInput> = z.strictObject({
  update: z.union([ z.lazy(() => InternshipUpdateWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUncheckedUpdateWithoutInternshipCareersInputSchema) ]),
  create: z.union([ z.lazy(() => InternshipCreateWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutInternshipCareersInputSchema) ]),
  where: z.lazy(() => InternshipWhereInputSchema).optional(),
});

export const InternshipUpdateToOneWithWhereWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipUpdateToOneWithWhereWithoutInternshipCareersInput> = z.strictObject({
  where: z.lazy(() => InternshipWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InternshipUpdateWithoutInternshipCareersInputSchema), z.lazy(() => InternshipUncheckedUpdateWithoutInternshipCareersInputSchema) ]),
});

export const InternshipUpdateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipUpdateWithoutInternshipCareersInput> = z.strictObject({
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Company: z.lazy(() => CompanyUpdateOneRequiredWithoutInternshipsNestedInputSchema).optional(),
});

export const InternshipUncheckedUpdateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateWithoutInternshipCareersInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const CareerUpsertWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerUpsertWithoutInternshipCareersInput> = z.strictObject({
  update: z.union([ z.lazy(() => CareerUpdateWithoutInternshipCareersInputSchema), z.lazy(() => CareerUncheckedUpdateWithoutInternshipCareersInputSchema) ]),
  create: z.union([ z.lazy(() => CareerCreateWithoutInternshipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutInternshipCareersInputSchema) ]),
  where: z.lazy(() => CareerWhereInputSchema).optional(),
});

export const CareerUpdateToOneWithWhereWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerUpdateToOneWithWhereWithoutInternshipCareersInput> = z.strictObject({
  where: z.lazy(() => CareerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CareerUpdateWithoutInternshipCareersInputSchema), z.lazy(() => CareerUncheckedUpdateWithoutInternshipCareersInputSchema) ]),
});

export const CareerUpdateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerUpdateWithoutInternshipCareersInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CareerUncheckedUpdateWithoutInternshipCareersInputSchema: z.ZodType<Prisma.CareerUncheckedUpdateWithoutInternshipCareersInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCreateWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipCreateWithoutCompanyInput> = z.strictObject({
  arm: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
  internshipCareers: z.lazy(() => InternshipCareerCreateNestedManyWithoutInternshipInputSchema).optional(),
});

export const InternshipUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUncheckedCreateWithoutCompanyInput> = z.strictObject({
  id: z.number().int().optional(),
  arm: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
  internshipCareers: z.lazy(() => InternshipCareerUncheckedCreateNestedManyWithoutInternshipInputSchema).optional(),
});

export const InternshipCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipCreateOrConnectWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => InternshipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InternshipCreateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema) ]),
});

export const InternshipCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.InternshipCreateManyCompanyInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => InternshipCreateManyCompanyInputSchema), z.lazy(() => InternshipCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const InternshipUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUpsertWithWhereUniqueWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => InternshipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InternshipUpdateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => InternshipCreateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedCreateWithoutCompanyInputSchema) ]),
});

export const InternshipUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUpdateWithWhereUniqueWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => InternshipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InternshipUpdateWithoutCompanyInputSchema), z.lazy(() => InternshipUncheckedUpdateWithoutCompanyInputSchema) ]),
});

export const InternshipUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUpdateManyWithWhereWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => InternshipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InternshipUpdateManyMutationInputSchema), z.lazy(() => InternshipUncheckedUpdateManyWithoutCompanyInputSchema) ]),
});

export const InternshipScalarWhereInputSchema: z.ZodType<Prisma.InternshipScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => InternshipScalarWhereInputSchema), z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipScalarWhereInputSchema), z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  arm: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  company_id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rrhh: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  interview_timetable: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  knowledge: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  requirements: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  payment: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  timetable: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  benefits: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  interns: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  workplace: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  modality: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  link: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  mail: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const InternshipCareerCreateManyInternshipInputSchema: z.ZodType<Prisma.InternshipCareerCreateManyInternshipInput> = z.strictObject({
  career_id: z.string(),
});

export const InternshipCareerUpdateWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUpdateWithoutInternshipInput> = z.strictObject({
  Career: z.lazy(() => CareerUpdateOneRequiredWithoutInternshipCareersNestedInputSchema).optional(),
});

export const InternshipCareerUncheckedUpdateWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateWithoutInternshipInput> = z.strictObject({
  career_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCareerUncheckedUpdateManyWithoutInternshipInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateManyWithoutInternshipInput> = z.strictObject({
  career_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCareerCreateManyCareerInputSchema: z.ZodType<Prisma.InternshipCareerCreateManyCareerInput> = z.strictObject({
  internship_id: z.number().int(),
});

export const InternshipCareerUpdateWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUpdateWithoutCareerInput> = z.strictObject({
  Internship: z.lazy(() => InternshipUpdateOneRequiredWithoutInternshipCareersNestedInputSchema).optional(),
});

export const InternshipCareerUncheckedUpdateWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateWithoutCareerInput> = z.strictObject({
  internship_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCareerUncheckedUpdateManyWithoutCareerInputSchema: z.ZodType<Prisma.InternshipCareerUncheckedUpdateManyWithoutCareerInput> = z.strictObject({
  internship_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const InternshipCreateManyCompanyInputSchema: z.ZodType<Prisma.InternshipCreateManyCompanyInput> = z.strictObject({
  id: z.number().int().optional(),
  arm: z.string(),
  city: z.string(),
  rrhh: z.string(),
  interview_timetable: z.string(),
  knowledge: z.string(),
  requirements: z.string(),
  payment: z.number().int(),
  timetable: z.string(),
  position: z.string(),
  benefits: z.string(),
  interns: z.number().int(),
  workplace: z.string(),
  modality: z.string(),
  link: z.string(),
  mail: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
});

export const InternshipUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUpdateWithoutCompanyInput> = z.strictObject({
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  internshipCareers: z.lazy(() => InternshipCareerUpdateManyWithoutInternshipNestedInputSchema).optional(),
});

export const InternshipUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateWithoutCompanyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  internshipCareers: z.lazy(() => InternshipCareerUncheckedUpdateManyWithoutInternshipNestedInputSchema).optional(),
});

export const InternshipUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateManyWithoutCompanyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  arm: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rrhh: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interview_timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  knowledge: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  requirements: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  timetable: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  benefits: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  interns: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const InternshipFindFirstArgsSchema: z.ZodType<Prisma.InternshipFindFirstArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(), InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipScalarFieldEnumSchema, InternshipScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InternshipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InternshipFindFirstOrThrowArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(), InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipScalarFieldEnumSchema, InternshipScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InternshipFindManyArgsSchema: z.ZodType<Prisma.InternshipFindManyArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(), InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipScalarFieldEnumSchema, InternshipScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InternshipAggregateArgsSchema: z.ZodType<Prisma.InternshipAggregateArgs> = z.object({
  where: InternshipWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(), InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InternshipGroupByArgsSchema: z.ZodType<Prisma.InternshipGroupByArgs> = z.object({
  where: InternshipWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipOrderByWithAggregationInputSchema.array(), InternshipOrderByWithAggregationInputSchema ]).optional(),
  by: InternshipScalarFieldEnumSchema.array(), 
  having: InternshipScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InternshipFindUniqueArgsSchema: z.ZodType<Prisma.InternshipFindUniqueArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema, 
}).strict();

export const InternshipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InternshipFindUniqueOrThrowArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema, 
}).strict();

export const CareerFindFirstArgsSchema: z.ZodType<Prisma.CareerFindFirstArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  where: CareerWhereInputSchema.optional(), 
  orderBy: z.union([ CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema ]).optional(),
  cursor: CareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CareerScalarFieldEnumSchema, CareerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CareerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CareerFindFirstOrThrowArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  where: CareerWhereInputSchema.optional(), 
  orderBy: z.union([ CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema ]).optional(),
  cursor: CareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CareerScalarFieldEnumSchema, CareerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CareerFindManyArgsSchema: z.ZodType<Prisma.CareerFindManyArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  where: CareerWhereInputSchema.optional(), 
  orderBy: z.union([ CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema ]).optional(),
  cursor: CareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CareerScalarFieldEnumSchema, CareerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CareerAggregateArgsSchema: z.ZodType<Prisma.CareerAggregateArgs> = z.object({
  where: CareerWhereInputSchema.optional(), 
  orderBy: z.union([ CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema ]).optional(),
  cursor: CareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CareerGroupByArgsSchema: z.ZodType<Prisma.CareerGroupByArgs> = z.object({
  where: CareerWhereInputSchema.optional(), 
  orderBy: z.union([ CareerOrderByWithAggregationInputSchema.array(), CareerOrderByWithAggregationInputSchema ]).optional(),
  by: CareerScalarFieldEnumSchema.array(), 
  having: CareerScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CareerFindUniqueArgsSchema: z.ZodType<Prisma.CareerFindUniqueArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  where: CareerWhereUniqueInputSchema, 
}).strict();

export const CareerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CareerFindUniqueOrThrowArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  where: CareerWhereUniqueInputSchema, 
}).strict();

export const InternshipCareerFindFirstArgsSchema: z.ZodType<Prisma.InternshipCareerFindFirstArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  where: InternshipCareerWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipCareerOrderByWithRelationInputSchema.array(), InternshipCareerOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipCareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipCareerScalarFieldEnumSchema, InternshipCareerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InternshipCareerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InternshipCareerFindFirstOrThrowArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  where: InternshipCareerWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipCareerOrderByWithRelationInputSchema.array(), InternshipCareerOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipCareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipCareerScalarFieldEnumSchema, InternshipCareerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InternshipCareerFindManyArgsSchema: z.ZodType<Prisma.InternshipCareerFindManyArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  where: InternshipCareerWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipCareerOrderByWithRelationInputSchema.array(), InternshipCareerOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipCareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipCareerScalarFieldEnumSchema, InternshipCareerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const InternshipCareerAggregateArgsSchema: z.ZodType<Prisma.InternshipCareerAggregateArgs> = z.object({
  where: InternshipCareerWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipCareerOrderByWithRelationInputSchema.array(), InternshipCareerOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipCareerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InternshipCareerGroupByArgsSchema: z.ZodType<Prisma.InternshipCareerGroupByArgs> = z.object({
  where: InternshipCareerWhereInputSchema.optional(), 
  orderBy: z.union([ InternshipCareerOrderByWithAggregationInputSchema.array(), InternshipCareerOrderByWithAggregationInputSchema ]).optional(),
  by: InternshipCareerScalarFieldEnumSchema.array(), 
  having: InternshipCareerScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const InternshipCareerFindUniqueArgsSchema: z.ZodType<Prisma.InternshipCareerFindUniqueArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  where: InternshipCareerWhereUniqueInputSchema, 
}).strict();

export const InternshipCareerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InternshipCareerFindUniqueOrThrowArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  where: InternshipCareerWhereUniqueInputSchema, 
}).strict();

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z.object({
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z.object({
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithAggregationInputSchema.array(), CompanyOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyScalarFieldEnumSchema.array(), 
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const InternshipCreateArgsSchema: z.ZodType<Prisma.InternshipCreateArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  data: z.union([ InternshipCreateInputSchema, InternshipUncheckedCreateInputSchema ]),
}).strict();

export const InternshipUpsertArgsSchema: z.ZodType<Prisma.InternshipUpsertArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema, 
  create: z.union([ InternshipCreateInputSchema, InternshipUncheckedCreateInputSchema ]),
  update: z.union([ InternshipUpdateInputSchema, InternshipUncheckedUpdateInputSchema ]),
}).strict();

export const InternshipCreateManyArgsSchema: z.ZodType<Prisma.InternshipCreateManyArgs> = z.object({
  data: z.union([ InternshipCreateManyInputSchema, InternshipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InternshipCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InternshipCreateManyAndReturnArgs> = z.object({
  data: z.union([ InternshipCreateManyInputSchema, InternshipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InternshipDeleteArgsSchema: z.ZodType<Prisma.InternshipDeleteArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema, 
}).strict();

export const InternshipUpdateArgsSchema: z.ZodType<Prisma.InternshipUpdateArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  data: z.union([ InternshipUpdateInputSchema, InternshipUncheckedUpdateInputSchema ]),
  where: InternshipWhereUniqueInputSchema, 
}).strict();

export const InternshipUpdateManyArgsSchema: z.ZodType<Prisma.InternshipUpdateManyArgs> = z.object({
  data: z.union([ InternshipUpdateManyMutationInputSchema, InternshipUncheckedUpdateManyInputSchema ]),
  where: InternshipWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InternshipUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InternshipUpdateManyAndReturnArgs> = z.object({
  data: z.union([ InternshipUpdateManyMutationInputSchema, InternshipUncheckedUpdateManyInputSchema ]),
  where: InternshipWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InternshipDeleteManyArgsSchema: z.ZodType<Prisma.InternshipDeleteManyArgs> = z.object({
  where: InternshipWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CareerCreateArgsSchema: z.ZodType<Prisma.CareerCreateArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  data: z.union([ CareerCreateInputSchema, CareerUncheckedCreateInputSchema ]),
}).strict();

export const CareerUpsertArgsSchema: z.ZodType<Prisma.CareerUpsertArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  where: CareerWhereUniqueInputSchema, 
  create: z.union([ CareerCreateInputSchema, CareerUncheckedCreateInputSchema ]),
  update: z.union([ CareerUpdateInputSchema, CareerUncheckedUpdateInputSchema ]),
}).strict();

export const CareerCreateManyArgsSchema: z.ZodType<Prisma.CareerCreateManyArgs> = z.object({
  data: z.union([ CareerCreateManyInputSchema, CareerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CareerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CareerCreateManyAndReturnArgs> = z.object({
  data: z.union([ CareerCreateManyInputSchema, CareerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CareerDeleteArgsSchema: z.ZodType<Prisma.CareerDeleteArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  where: CareerWhereUniqueInputSchema, 
}).strict();

export const CareerUpdateArgsSchema: z.ZodType<Prisma.CareerUpdateArgs> = z.object({
  select: CareerSelectSchema.optional(),
  include: CareerIncludeSchema.optional(),
  data: z.union([ CareerUpdateInputSchema, CareerUncheckedUpdateInputSchema ]),
  where: CareerWhereUniqueInputSchema, 
}).strict();

export const CareerUpdateManyArgsSchema: z.ZodType<Prisma.CareerUpdateManyArgs> = z.object({
  data: z.union([ CareerUpdateManyMutationInputSchema, CareerUncheckedUpdateManyInputSchema ]),
  where: CareerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CareerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CareerUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CareerUpdateManyMutationInputSchema, CareerUncheckedUpdateManyInputSchema ]),
  where: CareerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CareerDeleteManyArgsSchema: z.ZodType<Prisma.CareerDeleteManyArgs> = z.object({
  where: CareerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InternshipCareerCreateArgsSchema: z.ZodType<Prisma.InternshipCareerCreateArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  data: z.union([ InternshipCareerCreateInputSchema, InternshipCareerUncheckedCreateInputSchema ]),
}).strict();

export const InternshipCareerUpsertArgsSchema: z.ZodType<Prisma.InternshipCareerUpsertArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  where: InternshipCareerWhereUniqueInputSchema, 
  create: z.union([ InternshipCareerCreateInputSchema, InternshipCareerUncheckedCreateInputSchema ]),
  update: z.union([ InternshipCareerUpdateInputSchema, InternshipCareerUncheckedUpdateInputSchema ]),
}).strict();

export const InternshipCareerCreateManyArgsSchema: z.ZodType<Prisma.InternshipCareerCreateManyArgs> = z.object({
  data: z.union([ InternshipCareerCreateManyInputSchema, InternshipCareerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InternshipCareerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InternshipCareerCreateManyAndReturnArgs> = z.object({
  data: z.union([ InternshipCareerCreateManyInputSchema, InternshipCareerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const InternshipCareerDeleteArgsSchema: z.ZodType<Prisma.InternshipCareerDeleteArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  where: InternshipCareerWhereUniqueInputSchema, 
}).strict();

export const InternshipCareerUpdateArgsSchema: z.ZodType<Prisma.InternshipCareerUpdateArgs> = z.object({
  select: InternshipCareerSelectSchema.optional(),
  include: InternshipCareerIncludeSchema.optional(),
  data: z.union([ InternshipCareerUpdateInputSchema, InternshipCareerUncheckedUpdateInputSchema ]),
  where: InternshipCareerWhereUniqueInputSchema, 
}).strict();

export const InternshipCareerUpdateManyArgsSchema: z.ZodType<Prisma.InternshipCareerUpdateManyArgs> = z.object({
  data: z.union([ InternshipCareerUpdateManyMutationInputSchema, InternshipCareerUncheckedUpdateManyInputSchema ]),
  where: InternshipCareerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InternshipCareerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.InternshipCareerUpdateManyAndReturnArgs> = z.object({
  data: z.union([ InternshipCareerUpdateManyMutationInputSchema, InternshipCareerUncheckedUpdateManyInputSchema ]),
  where: InternshipCareerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const InternshipCareerDeleteManyArgsSchema: z.ZodType<Prisma.InternshipCareerDeleteManyArgs> = z.object({
  where: InternshipCareerWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema ]),
}).strict();

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
  create: z.union([ CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema ]),
}).strict();

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CompanyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyCreateManyAndReturnArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema ]),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CompanyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z.object({
  where: CompanyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();