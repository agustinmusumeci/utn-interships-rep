import { z } from "zod";
import type { Prisma } from "../generated/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(["ReadUncommitted", "ReadCommitted", "RepeatableRead", "Serializable"]);

export const IntershipScalarFieldEnumSchema = z.enum([
  "id",
  "arm",
  "company_id",
  "city",
  "rrhh",
  "interview_timetable",
  "knowledge",
  "requirements",
  "payment",
  "timetable",
  "position",
  "benefits",
  "interns",
  "workplace",
  "modality",
  "link",
  "mail",
]);

export const CareerScalarFieldEnumSchema = z.enum(["id", "name"]);

export const IntershipCareerScalarFieldEnumSchema = z.enum(["intership_id", "career_id"]);

export const CompanyScalarFieldEnumSchema = z.enum(["id", "name"]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// INTERSHIP SCHEMA
/////////////////////////////////////////

export const IntershipSchema = z.object({
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
  careers: z.array(z.string()),
});

export type Intership = z.infer<typeof IntershipSchema>;

/////////////////////////////////////////
// CAREER SCHEMA
/////////////////////////////////////////

export const CareerSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Career = z.infer<typeof CareerSchema>;

/////////////////////////////////////////
// INTERSHIP CAREER SCHEMA
/////////////////////////////////////////

export const IntershipCareerSchema = z.object({
  intership_id: z.number().int(),
  career_id: z.string(),
});

export type IntershipCareer = z.infer<typeof IntershipCareerSchema>;

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Company = z.infer<typeof CompanySchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// INTERSHIP
//------------------------------------------------------

export const IntershipIncludeSchema: z.ZodType<Prisma.IntershipInclude> = z
  .object({
    Company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    intershipCareers: z.union([z.boolean(), z.lazy(() => IntershipCareerFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => IntershipCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const IntershipArgsSchema: z.ZodType<Prisma.IntershipDefaultArgs> = z
  .object({
    select: z.lazy(() => IntershipSelectSchema).optional(),
    include: z.lazy(() => IntershipIncludeSchema).optional(),
  })
  .strict();

export const IntershipCountOutputTypeArgsSchema: z.ZodType<Prisma.IntershipCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => IntershipCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const IntershipCountOutputTypeSelectSchema: z.ZodType<Prisma.IntershipCountOutputTypeSelect> = z
  .object({
    intershipCareers: z.boolean().optional(),
  })
  .strict();

export const IntershipSelectSchema: z.ZodType<Prisma.IntershipSelect> = z
  .object({
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
    Company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
    intershipCareers: z.union([z.boolean(), z.lazy(() => IntershipCareerFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => IntershipCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

// CAREER
//------------------------------------------------------

export const CareerIncludeSchema: z.ZodType<Prisma.CareerInclude> = z
  .object({
    intershipCareers: z.union([z.boolean(), z.lazy(() => IntershipCareerFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => CareerCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const CareerArgsSchema: z.ZodType<Prisma.CareerDefaultArgs> = z
  .object({
    select: z.lazy(() => CareerSelectSchema).optional(),
    include: z.lazy(() => CareerIncludeSchema).optional(),
  })
  .strict();

export const CareerCountOutputTypeArgsSchema: z.ZodType<Prisma.CareerCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => CareerCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const CareerCountOutputTypeSelectSchema: z.ZodType<Prisma.CareerCountOutputTypeSelect> = z
  .object({
    intershipCareers: z.boolean().optional(),
  })
  .strict();

export const CareerSelectSchema: z.ZodType<Prisma.CareerSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    intershipCareers: z.union([z.boolean(), z.lazy(() => IntershipCareerFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => CareerCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

// INTERSHIP CAREER
//------------------------------------------------------

export const IntershipCareerIncludeSchema: z.ZodType<Prisma.IntershipCareerInclude> = z
  .object({
    Intership: z.union([z.boolean(), z.lazy(() => IntershipArgsSchema)]).optional(),
    Career: z.union([z.boolean(), z.lazy(() => CareerArgsSchema)]).optional(),
  })
  .strict();

export const IntershipCareerArgsSchema: z.ZodType<Prisma.IntershipCareerDefaultArgs> = z
  .object({
    select: z.lazy(() => IntershipCareerSelectSchema).optional(),
    include: z.lazy(() => IntershipCareerIncludeSchema).optional(),
  })
  .strict();

export const IntershipCareerSelectSchema: z.ZodType<Prisma.IntershipCareerSelect> = z
  .object({
    intership_id: z.boolean().optional(),
    career_id: z.boolean().optional(),
    Intership: z.union([z.boolean(), z.lazy(() => IntershipArgsSchema)]).optional(),
    Career: z.union([z.boolean(), z.lazy(() => CareerArgsSchema)]).optional(),
  })
  .strict();

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z
  .object({
    interships: z.union([z.boolean(), z.lazy(() => IntershipFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z
  .object({
    select: z.lazy(() => CompanySelectSchema).optional(),
    include: z.lazy(() => CompanyIncludeSchema).optional(),
  })
  .strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z
  .object({
    interships: z.boolean().optional(),
  })
  .strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    interships: z.union([z.boolean(), z.lazy(() => IntershipFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const IntershipWhereInputSchema: z.ZodType<Prisma.IntershipWhereInput> = z.strictObject({
  AND: z.union([z.lazy(() => IntershipWhereInputSchema), z.lazy(() => IntershipWhereInputSchema).array()]).optional(),
  OR: z
    .lazy(() => IntershipWhereInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => IntershipWhereInputSchema), z.lazy(() => IntershipWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  arm: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  company_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  city: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  rrhh: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  interview_timetable: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  knowledge: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  requirements: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  payment: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  timetable: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  position: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  benefits: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  interns: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  workplace: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  modality: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  link: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  mail: z
    .union([z.lazy(() => StringNullableFilterSchema), z.string()])
    .optional()
    .nullable(),
  Company: z.union([z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)]).optional(),
  intershipCareers: z.lazy(() => IntershipCareerListRelationFilterSchema).optional(),
});

export const IntershipOrderByWithRelationInputSchema: z.ZodType<Prisma.IntershipOrderByWithRelationInput> = z.strictObject({
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
  mail: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  Company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  intershipCareers: z.lazy(() => IntershipCareerOrderByRelationAggregateInputSchema).optional(),
});

export const IntershipWhereUniqueInputSchema: z.ZodType<Prisma.IntershipWhereUniqueInput> = z
  .union([
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
  .and(
    z.strictObject({
      id: z.number().int().optional(),
      arm: z.string().optional(),
      AND: z.union([z.lazy(() => IntershipWhereInputSchema), z.lazy(() => IntershipWhereInputSchema).array()]).optional(),
      OR: z
        .lazy(() => IntershipWhereInputSchema)
        .array()
        .optional(),
      NOT: z.union([z.lazy(() => IntershipWhereInputSchema), z.lazy(() => IntershipWhereInputSchema).array()]).optional(),
      company_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      city: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      rrhh: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      interview_timetable: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      knowledge: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      requirements: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      payment: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
      timetable: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      position: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      benefits: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      interns: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
      workplace: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      modality: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      link: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      mail: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      Company: z.union([z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)]).optional(),
      intershipCareers: z.lazy(() => IntershipCareerListRelationFilterSchema).optional(),
    }),
  );

export const IntershipOrderByWithAggregationInputSchema: z.ZodType<Prisma.IntershipOrderByWithAggregationInput> = z.strictObject({
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
  mail: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  _count: z.lazy(() => IntershipCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IntershipAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IntershipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IntershipMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IntershipSumOrderByAggregateInputSchema).optional(),
});

export const IntershipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IntershipScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([z.lazy(() => IntershipScalarWhereWithAggregatesInputSchema), z.lazy(() => IntershipScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z
    .lazy(() => IntershipScalarWhereWithAggregatesInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => IntershipScalarWhereWithAggregatesInputSchema), z.lazy(() => IntershipScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  arm: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  company_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  city: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  rrhh: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  interview_timetable: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  knowledge: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  requirements: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  payment: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  timetable: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  position: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  benefits: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  interns: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  workplace: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  modality: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  link: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  mail: z
    .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
    .optional()
    .nullable(),
});

export const CareerWhereInputSchema: z.ZodType<Prisma.CareerWhereInput> = z.strictObject({
  AND: z.union([z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array()]).optional(),
  OR: z
    .lazy(() => CareerWhereInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  intershipCareers: z.lazy(() => IntershipCareerListRelationFilterSchema).optional(),
});

export const CareerOrderByWithRelationInputSchema: z.ZodType<Prisma.CareerOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  intershipCareers: z.lazy(() => IntershipCareerOrderByRelationAggregateInputSchema).optional(),
});

export const CareerWhereUniqueInputSchema: z.ZodType<Prisma.CareerWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z.strictObject({
      id: z.string().optional(),
      AND: z.union([z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array()]).optional(),
      OR: z
        .lazy(() => CareerWhereInputSchema)
        .array()
        .optional(),
      NOT: z.union([z.lazy(() => CareerWhereInputSchema), z.lazy(() => CareerWhereInputSchema).array()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      intershipCareers: z.lazy(() => IntershipCareerListRelationFilterSchema).optional(),
    }),
  );

export const CareerOrderByWithAggregationInputSchema: z.ZodType<Prisma.CareerOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CareerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CareerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CareerMinOrderByAggregateInputSchema).optional(),
});

export const CareerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CareerScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([z.lazy(() => CareerScalarWhereWithAggregatesInputSchema), z.lazy(() => CareerScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z
    .lazy(() => CareerScalarWhereWithAggregatesInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => CareerScalarWhereWithAggregatesInputSchema), z.lazy(() => CareerScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
});

export const IntershipCareerWhereInputSchema: z.ZodType<Prisma.IntershipCareerWhereInput> = z.strictObject({
  AND: z.union([z.lazy(() => IntershipCareerWhereInputSchema), z.lazy(() => IntershipCareerWhereInputSchema).array()]).optional(),
  OR: z
    .lazy(() => IntershipCareerWhereInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => IntershipCareerWhereInputSchema), z.lazy(() => IntershipCareerWhereInputSchema).array()]).optional(),
  intership_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  career_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  Intership: z.union([z.lazy(() => IntershipScalarRelationFilterSchema), z.lazy(() => IntershipWhereInputSchema)]).optional(),
  Career: z.union([z.lazy(() => CareerScalarRelationFilterSchema), z.lazy(() => CareerWhereInputSchema)]).optional(),
});

export const IntershipCareerOrderByWithRelationInputSchema: z.ZodType<Prisma.IntershipCareerOrderByWithRelationInput> = z.strictObject({
  intership_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
  Intership: z.lazy(() => IntershipOrderByWithRelationInputSchema).optional(),
  Career: z.lazy(() => CareerOrderByWithRelationInputSchema).optional(),
});

export const IntershipCareerWhereUniqueInputSchema: z.ZodType<Prisma.IntershipCareerWhereUniqueInput> = z
  .object({
    intership_id_career_id: z.lazy(() => IntershipCareerIntership_idCareer_idCompoundUniqueInputSchema),
  })
  .and(
    z.strictObject({
      intership_id_career_id: z.lazy(() => IntershipCareerIntership_idCareer_idCompoundUniqueInputSchema).optional(),
      AND: z.union([z.lazy(() => IntershipCareerWhereInputSchema), z.lazy(() => IntershipCareerWhereInputSchema).array()]).optional(),
      OR: z
        .lazy(() => IntershipCareerWhereInputSchema)
        .array()
        .optional(),
      NOT: z.union([z.lazy(() => IntershipCareerWhereInputSchema), z.lazy(() => IntershipCareerWhereInputSchema).array()]).optional(),
      intership_id: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
      career_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      Intership: z.union([z.lazy(() => IntershipScalarRelationFilterSchema), z.lazy(() => IntershipWhereInputSchema)]).optional(),
      Career: z.union([z.lazy(() => CareerScalarRelationFilterSchema), z.lazy(() => CareerWhereInputSchema)]).optional(),
    }),
  );

export const IntershipCareerOrderByWithAggregationInputSchema: z.ZodType<Prisma.IntershipCareerOrderByWithAggregationInput> = z.strictObject({
  intership_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IntershipCareerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IntershipCareerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IntershipCareerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IntershipCareerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IntershipCareerSumOrderByAggregateInputSchema).optional(),
});

export const IntershipCareerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IntershipCareerScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([z.lazy(() => IntershipCareerScalarWhereWithAggregatesInputSchema), z.lazy(() => IntershipCareerScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z
    .lazy(() => IntershipCareerScalarWhereWithAggregatesInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => IntershipCareerScalarWhereWithAggregatesInputSchema), z.lazy(() => IntershipCareerScalarWhereWithAggregatesInputSchema).array()]).optional(),
  intership_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  career_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
});

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.strictObject({
  AND: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
  OR: z
    .lazy(() => CompanyWhereInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  interships: z.lazy(() => IntershipListRelationFilterSchema).optional(),
});

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  interships: z.lazy(() => IntershipOrderByRelationAggregateInputSchema).optional(),
});

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z.strictObject({
      id: z.string().optional(),
      AND: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
      OR: z
        .lazy(() => CompanyWhereInputSchema)
        .array()
        .optional(),
      NOT: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      interships: z.lazy(() => IntershipListRelationFilterSchema).optional(),
    }),
  );

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional(),
});

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z
    .lazy(() => CompanyScalarWhereWithAggregatesInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
});

export const IntershipCreateInputSchema: z.ZodType<Prisma.IntershipCreateInput> = z.strictObject({
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
  Company: z.lazy(() => CompanyCreateNestedOneWithoutIntershipsInputSchema),
  intershipCareers: z.lazy(() => IntershipCareerCreateNestedManyWithoutIntershipInputSchema).optional(),
});

export const IntershipUncheckedCreateInputSchema: z.ZodType<Prisma.IntershipUncheckedCreateInput> = z.strictObject({
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
  intershipCareers: z.lazy(() => IntershipCareerUncheckedCreateNestedManyWithoutIntershipInputSchema).optional(),
});

export const IntershipUpdateInputSchema: z.ZodType<Prisma.IntershipUpdateInput> = z.strictObject({
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
  Company: z.lazy(() => CompanyUpdateOneRequiredWithoutIntershipsNestedInputSchema).optional(),
  intershipCareers: z.lazy(() => IntershipCareerUpdateManyWithoutIntershipNestedInputSchema).optional(),
});

export const IntershipUncheckedUpdateInputSchema: z.ZodType<Prisma.IntershipUncheckedUpdateInput> = z.strictObject({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  company_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
  intershipCareers: z.lazy(() => IntershipCareerUncheckedUpdateManyWithoutIntershipNestedInputSchema).optional(),
});

export const IntershipCreateManyInputSchema: z.ZodType<Prisma.IntershipCreateManyInput> = z.strictObject({
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
});

export const IntershipUpdateManyMutationInputSchema: z.ZodType<Prisma.IntershipUpdateManyMutationInput> = z.strictObject({
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
});

export const IntershipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IntershipUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  company_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
});

export const CareerCreateInputSchema: z.ZodType<Prisma.CareerCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  intershipCareers: z.lazy(() => IntershipCareerCreateNestedManyWithoutCareerInputSchema).optional(),
});

export const CareerUncheckedCreateInputSchema: z.ZodType<Prisma.CareerUncheckedCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  intershipCareers: z.lazy(() => IntershipCareerUncheckedCreateNestedManyWithoutCareerInputSchema).optional(),
});

export const CareerUpdateInputSchema: z.ZodType<Prisma.CareerUpdateInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  intershipCareers: z.lazy(() => IntershipCareerUpdateManyWithoutCareerNestedInputSchema).optional(),
});

export const CareerUncheckedUpdateInputSchema: z.ZodType<Prisma.CareerUncheckedUpdateInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  intershipCareers: z.lazy(() => IntershipCareerUncheckedUpdateManyWithoutCareerNestedInputSchema).optional(),
});

export const CareerCreateManyInputSchema: z.ZodType<Prisma.CareerCreateManyInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CareerUpdateManyMutationInputSchema: z.ZodType<Prisma.CareerUpdateManyMutationInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const CareerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CareerUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCareerCreateInputSchema: z.ZodType<Prisma.IntershipCareerCreateInput> = z.strictObject({
  Intership: z.lazy(() => IntershipCreateNestedOneWithoutIntershipCareersInputSchema),
  Career: z.lazy(() => CareerCreateNestedOneWithoutIntershipCareersInputSchema),
});

export const IntershipCareerUncheckedCreateInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedCreateInput> = z.strictObject({
  intership_id: z.number().int(),
  career_id: z.string(),
});

export const IntershipCareerUpdateInputSchema: z.ZodType<Prisma.IntershipCareerUpdateInput> = z.strictObject({
  Intership: z.lazy(() => IntershipUpdateOneRequiredWithoutIntershipCareersNestedInputSchema).optional(),
  Career: z.lazy(() => CareerUpdateOneRequiredWithoutIntershipCareersNestedInputSchema).optional(),
});

export const IntershipCareerUncheckedUpdateInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateInput> = z.strictObject({
  intership_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  career_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCareerCreateManyInputSchema: z.ZodType<Prisma.IntershipCareerCreateManyInput> = z.strictObject({
  intership_id: z.number().int(),
  career_id: z.string(),
});

export const IntershipCareerUpdateManyMutationInputSchema: z.ZodType<Prisma.IntershipCareerUpdateManyMutationInput> = z.strictObject({});

export const IntershipCareerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateManyInput> = z.strictObject({
  intership_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  career_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  interships: z.lazy(() => IntershipCreateNestedManyWithoutCompanyInputSchema).optional(),
});

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
  interships: z.lazy(() => IntershipUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
});

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interships: z.lazy(() => IntershipUpdateManyWithoutCompanyNestedInputSchema).optional(),
});

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interships: z.lazy(() => IntershipUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
});

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
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
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
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
  not: z
    .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
    .optional()
    .nullable(),
});

export const CompanyScalarRelationFilterSchema: z.ZodType<Prisma.CompanyScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional(),
});

export const IntershipCareerListRelationFilterSchema: z.ZodType<Prisma.IntershipCareerListRelationFilter> = z.strictObject({
  every: z.lazy(() => IntershipCareerWhereInputSchema).optional(),
  some: z.lazy(() => IntershipCareerWhereInputSchema).optional(),
  none: z.lazy(() => IntershipCareerWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const IntershipCareerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IntershipCareerOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipCountOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipCountOrderByAggregateInput> = z.strictObject({
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
});

export const IntershipAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  payment: z.lazy(() => SortOrderSchema).optional(),
  interns: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipMaxOrderByAggregateInput> = z.strictObject({
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
});

export const IntershipMinOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipMinOrderByAggregateInput> = z.strictObject({
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
});

export const IntershipSumOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipSumOrderByAggregateInput> = z.strictObject({
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
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
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
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
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
  not: z
    .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
    .optional()
    .nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const CareerCountOrderByAggregateInputSchema: z.ZodType<Prisma.CareerCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CareerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CareerMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CareerMinOrderByAggregateInputSchema: z.ZodType<Prisma.CareerMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipScalarRelationFilterSchema: z.ZodType<Prisma.IntershipScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => IntershipWhereInputSchema).optional(),
  isNot: z.lazy(() => IntershipWhereInputSchema).optional(),
});

export const CareerScalarRelationFilterSchema: z.ZodType<Prisma.CareerScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CareerWhereInputSchema).optional(),
  isNot: z.lazy(() => CareerWhereInputSchema).optional(),
});

export const IntershipCareerIntership_idCareer_idCompoundUniqueInputSchema: z.ZodType<Prisma.IntershipCareerIntership_idCareer_idCompoundUniqueInput> = z.strictObject({
  intership_id: z.number(),
  career_id: z.string(),
});

export const IntershipCareerCountOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipCareerCountOrderByAggregateInput> = z.strictObject({
  intership_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipCareerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipCareerAvgOrderByAggregateInput> = z.strictObject({
  intership_id: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipCareerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipCareerMaxOrderByAggregateInput> = z.strictObject({
  intership_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipCareerMinOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipCareerMinOrderByAggregateInput> = z.strictObject({
  intership_id: z.lazy(() => SortOrderSchema).optional(),
  career_id: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipCareerSumOrderByAggregateInputSchema: z.ZodType<Prisma.IntershipCareerSumOrderByAggregateInput> = z.strictObject({
  intership_id: z.lazy(() => SortOrderSchema).optional(),
});

export const IntershipListRelationFilterSchema: z.ZodType<Prisma.IntershipListRelationFilter> = z.strictObject({
  every: z.lazy(() => IntershipWhereInputSchema).optional(),
  some: z.lazy(() => IntershipWhereInputSchema).optional(),
  none: z.lazy(() => IntershipWhereInputSchema).optional(),
});

export const IntershipOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IntershipOrderByRelationAggregateInput> = z.strictObject({
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

export const CompanyCreateNestedOneWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutIntershipsInput> = z.strictObject({
  create: z.union([z.lazy(() => CompanyCreateWithoutIntershipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutIntershipsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutIntershipsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
});

export const IntershipCareerCreateNestedManyWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerCreateNestedManyWithoutIntershipInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyIntershipInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
});

export const IntershipCareerUncheckedCreateNestedManyWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedCreateNestedManyWithoutIntershipInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyIntershipInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
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

export const CompanyUpdateOneRequiredWithoutIntershipsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutIntershipsNestedInput> = z.strictObject({
  create: z.union([z.lazy(() => CompanyCreateWithoutIntershipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutIntershipsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutIntershipsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutIntershipsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z
    .union([
      z.lazy(() => CompanyUpdateToOneWithWhereWithoutIntershipsInputSchema),
      z.lazy(() => CompanyUpdateWithoutIntershipsInputSchema),
      z.lazy(() => CompanyUncheckedUpdateWithoutIntershipsInputSchema),
    ])
    .optional(),
});

export const IntershipCareerUpdateManyWithoutIntershipNestedInputSchema: z.ZodType<Prisma.IntershipCareerUpdateManyWithoutIntershipNestedInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutIntershipInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyIntershipInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutIntershipInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutIntershipInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => IntershipCareerScalarWhereInputSchema), z.lazy(() => IntershipCareerScalarWhereInputSchema).array()]).optional(),
});

export const IntershipCareerUncheckedUpdateManyWithoutIntershipNestedInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateManyWithoutIntershipNestedInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutIntershipInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutIntershipInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyIntershipInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutIntershipInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutIntershipInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => IntershipCareerScalarWhereInputSchema), z.lazy(() => IntershipCareerScalarWhereInputSchema).array()]).optional(),
});

export const IntershipCareerCreateNestedManyWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerCreateNestedManyWithoutCareerInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
});

export const IntershipCareerUncheckedCreateNestedManyWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedCreateNestedManyWithoutCareerInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
});

export const IntershipCareerUpdateManyWithoutCareerNestedInputSchema: z.ZodType<Prisma.IntershipCareerUpdateManyWithoutCareerNestedInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutCareerInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutCareerInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutCareerInputSchema), z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutCareerInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => IntershipCareerScalarWhereInputSchema), z.lazy(() => IntershipCareerScalarWhereInputSchema).array()]).optional(),
});

export const IntershipCareerUncheckedUpdateManyWithoutCareerNestedInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateManyWithoutCareerNestedInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema).array(),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema),
      z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema), z.lazy(() => IntershipCareerCreateOrConnectWithoutCareerInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => IntershipCareerUpsertWithWhereUniqueWithoutCareerInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCareerCreateManyCareerInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => IntershipCareerWhereUniqueInputSchema), z.lazy(() => IntershipCareerWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutCareerInputSchema), z.lazy(() => IntershipCareerUpdateWithWhereUniqueWithoutCareerInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutCareerInputSchema), z.lazy(() => IntershipCareerUpdateManyWithWhereWithoutCareerInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => IntershipCareerScalarWhereInputSchema), z.lazy(() => IntershipCareerScalarWhereInputSchema).array()]).optional(),
});

export const IntershipCreateNestedOneWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipCreateNestedOneWithoutIntershipCareersInput> = z.strictObject({
  create: z.union([z.lazy(() => IntershipCreateWithoutIntershipCareersInputSchema), z.lazy(() => IntershipUncheckedCreateWithoutIntershipCareersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => IntershipCreateOrConnectWithoutIntershipCareersInputSchema).optional(),
  connect: z.lazy(() => IntershipWhereUniqueInputSchema).optional(),
});

export const CareerCreateNestedOneWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerCreateNestedOneWithoutIntershipCareersInput> = z.strictObject({
  create: z.union([z.lazy(() => CareerCreateWithoutIntershipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutIntershipCareersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CareerCreateOrConnectWithoutIntershipCareersInputSchema).optional(),
  connect: z.lazy(() => CareerWhereUniqueInputSchema).optional(),
});

export const IntershipUpdateOneRequiredWithoutIntershipCareersNestedInputSchema: z.ZodType<Prisma.IntershipUpdateOneRequiredWithoutIntershipCareersNestedInput> = z.strictObject({
  create: z.union([z.lazy(() => IntershipCreateWithoutIntershipCareersInputSchema), z.lazy(() => IntershipUncheckedCreateWithoutIntershipCareersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => IntershipCreateOrConnectWithoutIntershipCareersInputSchema).optional(),
  upsert: z.lazy(() => IntershipUpsertWithoutIntershipCareersInputSchema).optional(),
  connect: z.lazy(() => IntershipWhereUniqueInputSchema).optional(),
  update: z
    .union([
      z.lazy(() => IntershipUpdateToOneWithWhereWithoutIntershipCareersInputSchema),
      z.lazy(() => IntershipUpdateWithoutIntershipCareersInputSchema),
      z.lazy(() => IntershipUncheckedUpdateWithoutIntershipCareersInputSchema),
    ])
    .optional(),
});

export const CareerUpdateOneRequiredWithoutIntershipCareersNestedInputSchema: z.ZodType<Prisma.CareerUpdateOneRequiredWithoutIntershipCareersNestedInput> = z.strictObject({
  create: z.union([z.lazy(() => CareerCreateWithoutIntershipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutIntershipCareersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CareerCreateOrConnectWithoutIntershipCareersInputSchema).optional(),
  upsert: z.lazy(() => CareerUpsertWithoutIntershipCareersInputSchema).optional(),
  connect: z.lazy(() => CareerWhereUniqueInputSchema).optional(),
  update: z
    .union([
      z.lazy(() => CareerUpdateToOneWithWhereWithoutIntershipCareersInputSchema),
      z.lazy(() => CareerUpdateWithoutIntershipCareersInputSchema),
      z.lazy(() => CareerUncheckedUpdateWithoutIntershipCareersInputSchema),
    ])
    .optional(),
});

export const IntershipCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipCreateNestedManyWithoutCompanyInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema).array(),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
});

export const IntershipUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUncheckedCreateNestedManyWithoutCompanyInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema).array(),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
});

export const IntershipUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.IntershipUpdateManyWithoutCompanyNestedInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema).array(),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => IntershipUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => IntershipUpsertWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => IntershipUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => IntershipUpdateWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => IntershipUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => IntershipUpdateManyWithWhereWithoutCompanyInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => IntershipScalarWhereInputSchema), z.lazy(() => IntershipScalarWhereInputSchema).array()]).optional(),
});

export const IntershipUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.IntershipUncheckedUpdateManyWithoutCompanyNestedInput> = z.strictObject({
  create: z
    .union([
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipCreateWithoutCompanyInputSchema).array(),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema),
      z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema).array(),
    ])
    .optional(),
  connectOrCreate: z.union([z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => IntershipCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => IntershipUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => IntershipUpsertWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => IntershipCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => IntershipWhereUniqueInputSchema), z.lazy(() => IntershipWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => IntershipUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => IntershipUpdateWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => IntershipUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => IntershipUpdateManyWithWhereWithoutCompanyInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => IntershipScalarWhereInputSchema), z.lazy(() => IntershipScalarWhereInputSchema).array()]).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
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
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
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
  not: z
    .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
    .optional()
    .nullable(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
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
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
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
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
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
  not: z
    .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
    .optional()
    .nullable(),
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
  not: z
    .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
    .optional()
    .nullable(),
});

export const CompanyCreateWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutIntershipsInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CompanyUncheckedCreateWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutIntershipsInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CompanyCreateOrConnectWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutIntershipsInput> = z.strictObject({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CompanyCreateWithoutIntershipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutIntershipsInputSchema)]),
});

export const IntershipCareerCreateWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerCreateWithoutIntershipInput> = z.strictObject({
  Career: z.lazy(() => CareerCreateNestedOneWithoutIntershipCareersInputSchema),
});

export const IntershipCareerUncheckedCreateWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedCreateWithoutIntershipInput> = z.strictObject({
  career_id: z.string(),
});

export const IntershipCareerCreateOrConnectWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerCreateOrConnectWithoutIntershipInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerWhereUniqueInputSchema),
  create: z.union([z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema)]),
});

export const IntershipCareerCreateManyIntershipInputEnvelopeSchema: z.ZodType<Prisma.IntershipCareerCreateManyIntershipInputEnvelope> = z.strictObject({
  data: z.union([z.lazy(() => IntershipCareerCreateManyIntershipInputSchema), z.lazy(() => IntershipCareerCreateManyIntershipInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
});

export const CompanyUpsertWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutIntershipsInput> = z.strictObject({
  update: z.union([z.lazy(() => CompanyUpdateWithoutIntershipsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutIntershipsInputSchema)]),
  create: z.union([z.lazy(() => CompanyCreateWithoutIntershipsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutIntershipsInputSchema)]),
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
});

export const CompanyUpdateToOneWithWhereWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutIntershipsInput> = z.strictObject({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([z.lazy(() => CompanyUpdateWithoutIntershipsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutIntershipsInputSchema)]),
});

export const CompanyUpdateWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutIntershipsInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const CompanyUncheckedUpdateWithoutIntershipsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutIntershipsInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCareerUpsertWithWhereUniqueWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUpsertWithWhereUniqueWithoutIntershipInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerWhereUniqueInputSchema),
  update: z.union([z.lazy(() => IntershipCareerUpdateWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUncheckedUpdateWithoutIntershipInputSchema)]),
  create: z.union([z.lazy(() => IntershipCareerCreateWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUncheckedCreateWithoutIntershipInputSchema)]),
});

export const IntershipCareerUpdateWithWhereUniqueWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUpdateWithWhereUniqueWithoutIntershipInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerWhereUniqueInputSchema),
  data: z.union([z.lazy(() => IntershipCareerUpdateWithoutIntershipInputSchema), z.lazy(() => IntershipCareerUncheckedUpdateWithoutIntershipInputSchema)]),
});

export const IntershipCareerUpdateManyWithWhereWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUpdateManyWithWhereWithoutIntershipInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerScalarWhereInputSchema),
  data: z.union([z.lazy(() => IntershipCareerUpdateManyMutationInputSchema), z.lazy(() => IntershipCareerUncheckedUpdateManyWithoutIntershipInputSchema)]),
});

export const IntershipCareerScalarWhereInputSchema: z.ZodType<Prisma.IntershipCareerScalarWhereInput> = z.strictObject({
  AND: z.union([z.lazy(() => IntershipCareerScalarWhereInputSchema), z.lazy(() => IntershipCareerScalarWhereInputSchema).array()]).optional(),
  OR: z
    .lazy(() => IntershipCareerScalarWhereInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => IntershipCareerScalarWhereInputSchema), z.lazy(() => IntershipCareerScalarWhereInputSchema).array()]).optional(),
  intership_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  career_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
});

export const IntershipCareerCreateWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerCreateWithoutCareerInput> = z.strictObject({
  Intership: z.lazy(() => IntershipCreateNestedOneWithoutIntershipCareersInputSchema),
});

export const IntershipCareerUncheckedCreateWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedCreateWithoutCareerInput> = z.strictObject({
  intership_id: z.number().int(),
});

export const IntershipCareerCreateOrConnectWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerCreateOrConnectWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerWhereUniqueInputSchema),
  create: z.union([z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema), z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema)]),
});

export const IntershipCareerCreateManyCareerInputEnvelopeSchema: z.ZodType<Prisma.IntershipCareerCreateManyCareerInputEnvelope> = z.strictObject({
  data: z.union([z.lazy(() => IntershipCareerCreateManyCareerInputSchema), z.lazy(() => IntershipCareerCreateManyCareerInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
});

export const IntershipCareerUpsertWithWhereUniqueWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUpsertWithWhereUniqueWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerWhereUniqueInputSchema),
  update: z.union([z.lazy(() => IntershipCareerUpdateWithoutCareerInputSchema), z.lazy(() => IntershipCareerUncheckedUpdateWithoutCareerInputSchema)]),
  create: z.union([z.lazy(() => IntershipCareerCreateWithoutCareerInputSchema), z.lazy(() => IntershipCareerUncheckedCreateWithoutCareerInputSchema)]),
});

export const IntershipCareerUpdateWithWhereUniqueWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUpdateWithWhereUniqueWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerWhereUniqueInputSchema),
  data: z.union([z.lazy(() => IntershipCareerUpdateWithoutCareerInputSchema), z.lazy(() => IntershipCareerUncheckedUpdateWithoutCareerInputSchema)]),
});

export const IntershipCareerUpdateManyWithWhereWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUpdateManyWithWhereWithoutCareerInput> = z.strictObject({
  where: z.lazy(() => IntershipCareerScalarWhereInputSchema),
  data: z.union([z.lazy(() => IntershipCareerUpdateManyMutationInputSchema), z.lazy(() => IntershipCareerUncheckedUpdateManyWithoutCareerInputSchema)]),
});

export const IntershipCreateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipCreateWithoutIntershipCareersInput> = z.strictObject({
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
  Company: z.lazy(() => CompanyCreateNestedOneWithoutIntershipsInputSchema),
});

export const IntershipUncheckedCreateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipUncheckedCreateWithoutIntershipCareersInput> = z.strictObject({
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
});

export const IntershipCreateOrConnectWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipCreateOrConnectWithoutIntershipCareersInput> = z.strictObject({
  where: z.lazy(() => IntershipWhereUniqueInputSchema),
  create: z.union([z.lazy(() => IntershipCreateWithoutIntershipCareersInputSchema), z.lazy(() => IntershipUncheckedCreateWithoutIntershipCareersInputSchema)]),
});

export const CareerCreateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerCreateWithoutIntershipCareersInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CareerUncheckedCreateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerUncheckedCreateWithoutIntershipCareersInput> = z.strictObject({
  id: z.string(),
  name: z.string(),
});

export const CareerCreateOrConnectWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerCreateOrConnectWithoutIntershipCareersInput> = z.strictObject({
  where: z.lazy(() => CareerWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CareerCreateWithoutIntershipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutIntershipCareersInputSchema)]),
});

export const IntershipUpsertWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipUpsertWithoutIntershipCareersInput> = z.strictObject({
  update: z.union([z.lazy(() => IntershipUpdateWithoutIntershipCareersInputSchema), z.lazy(() => IntershipUncheckedUpdateWithoutIntershipCareersInputSchema)]),
  create: z.union([z.lazy(() => IntershipCreateWithoutIntershipCareersInputSchema), z.lazy(() => IntershipUncheckedCreateWithoutIntershipCareersInputSchema)]),
  where: z.lazy(() => IntershipWhereInputSchema).optional(),
});

export const IntershipUpdateToOneWithWhereWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipUpdateToOneWithWhereWithoutIntershipCareersInput> = z.strictObject({
  where: z.lazy(() => IntershipWhereInputSchema).optional(),
  data: z.union([z.lazy(() => IntershipUpdateWithoutIntershipCareersInputSchema), z.lazy(() => IntershipUncheckedUpdateWithoutIntershipCareersInputSchema)]),
});

export const IntershipUpdateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipUpdateWithoutIntershipCareersInput> = z.strictObject({
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
  Company: z.lazy(() => CompanyUpdateOneRequiredWithoutIntershipsNestedInputSchema).optional(),
});

export const IntershipUncheckedUpdateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.IntershipUncheckedUpdateWithoutIntershipCareersInput> = z.strictObject({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  company_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
});

export const CareerUpsertWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerUpsertWithoutIntershipCareersInput> = z.strictObject({
  update: z.union([z.lazy(() => CareerUpdateWithoutIntershipCareersInputSchema), z.lazy(() => CareerUncheckedUpdateWithoutIntershipCareersInputSchema)]),
  create: z.union([z.lazy(() => CareerCreateWithoutIntershipCareersInputSchema), z.lazy(() => CareerUncheckedCreateWithoutIntershipCareersInputSchema)]),
  where: z.lazy(() => CareerWhereInputSchema).optional(),
});

export const CareerUpdateToOneWithWhereWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerUpdateToOneWithWhereWithoutIntershipCareersInput> = z.strictObject({
  where: z.lazy(() => CareerWhereInputSchema).optional(),
  data: z.union([z.lazy(() => CareerUpdateWithoutIntershipCareersInputSchema), z.lazy(() => CareerUncheckedUpdateWithoutIntershipCareersInputSchema)]),
});

export const CareerUpdateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerUpdateWithoutIntershipCareersInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const CareerUncheckedUpdateWithoutIntershipCareersInputSchema: z.ZodType<Prisma.CareerUncheckedUpdateWithoutIntershipCareersInput> = z.strictObject({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCreateWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipCreateWithoutCompanyInput> = z.strictObject({
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
  intershipCareers: z.lazy(() => IntershipCareerCreateNestedManyWithoutIntershipInputSchema).optional(),
});

export const IntershipUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUncheckedCreateWithoutCompanyInput> = z.strictObject({
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
  intershipCareers: z.lazy(() => IntershipCareerUncheckedCreateNestedManyWithoutIntershipInputSchema).optional(),
});

export const IntershipCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipCreateOrConnectWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => IntershipWhereUniqueInputSchema),
  create: z.union([z.lazy(() => IntershipCreateWithoutCompanyInputSchema), z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema)]),
});

export const IntershipCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.IntershipCreateManyCompanyInputEnvelope> = z.strictObject({
  data: z.union([z.lazy(() => IntershipCreateManyCompanyInputSchema), z.lazy(() => IntershipCreateManyCompanyInputSchema).array()]),
  skipDuplicates: z.boolean().optional(),
});

export const IntershipUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUpsertWithWhereUniqueWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => IntershipWhereUniqueInputSchema),
  update: z.union([z.lazy(() => IntershipUpdateWithoutCompanyInputSchema), z.lazy(() => IntershipUncheckedUpdateWithoutCompanyInputSchema)]),
  create: z.union([z.lazy(() => IntershipCreateWithoutCompanyInputSchema), z.lazy(() => IntershipUncheckedCreateWithoutCompanyInputSchema)]),
});

export const IntershipUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUpdateWithWhereUniqueWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => IntershipWhereUniqueInputSchema),
  data: z.union([z.lazy(() => IntershipUpdateWithoutCompanyInputSchema), z.lazy(() => IntershipUncheckedUpdateWithoutCompanyInputSchema)]),
});

export const IntershipUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUpdateManyWithWhereWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => IntershipScalarWhereInputSchema),
  data: z.union([z.lazy(() => IntershipUpdateManyMutationInputSchema), z.lazy(() => IntershipUncheckedUpdateManyWithoutCompanyInputSchema)]),
});

export const IntershipScalarWhereInputSchema: z.ZodType<Prisma.IntershipScalarWhereInput> = z.strictObject({
  AND: z.union([z.lazy(() => IntershipScalarWhereInputSchema), z.lazy(() => IntershipScalarWhereInputSchema).array()]).optional(),
  OR: z
    .lazy(() => IntershipScalarWhereInputSchema)
    .array()
    .optional(),
  NOT: z.union([z.lazy(() => IntershipScalarWhereInputSchema), z.lazy(() => IntershipScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  arm: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  company_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  city: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  rrhh: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  interview_timetable: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  knowledge: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  requirements: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  payment: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  timetable: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  position: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  benefits: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  interns: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  workplace: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  modality: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  link: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  mail: z
    .union([z.lazy(() => StringNullableFilterSchema), z.string()])
    .optional()
    .nullable(),
});

export const IntershipCareerCreateManyIntershipInputSchema: z.ZodType<Prisma.IntershipCareerCreateManyIntershipInput> = z.strictObject({
  career_id: z.string(),
});

export const IntershipCareerUpdateWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUpdateWithoutIntershipInput> = z.strictObject({
  Career: z.lazy(() => CareerUpdateOneRequiredWithoutIntershipCareersNestedInputSchema).optional(),
});

export const IntershipCareerUncheckedUpdateWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateWithoutIntershipInput> = z.strictObject({
  career_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCareerUncheckedUpdateManyWithoutIntershipInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateManyWithoutIntershipInput> = z.strictObject({
  career_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCareerCreateManyCareerInputSchema: z.ZodType<Prisma.IntershipCareerCreateManyCareerInput> = z.strictObject({
  intership_id: z.number().int(),
});

export const IntershipCareerUpdateWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUpdateWithoutCareerInput> = z.strictObject({
  Intership: z.lazy(() => IntershipUpdateOneRequiredWithoutIntershipCareersNestedInputSchema).optional(),
});

export const IntershipCareerUncheckedUpdateWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateWithoutCareerInput> = z.strictObject({
  intership_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCareerUncheckedUpdateManyWithoutCareerInputSchema: z.ZodType<Prisma.IntershipCareerUncheckedUpdateManyWithoutCareerInput> = z.strictObject({
  intership_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
});

export const IntershipCreateManyCompanyInputSchema: z.ZodType<Prisma.IntershipCreateManyCompanyInput> = z.strictObject({
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
});

export const IntershipUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUpdateWithoutCompanyInput> = z.strictObject({
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
  intershipCareers: z.lazy(() => IntershipCareerUpdateManyWithoutIntershipNestedInputSchema).optional(),
});

export const IntershipUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUncheckedUpdateWithoutCompanyInput> = z.strictObject({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
  intershipCareers: z.lazy(() => IntershipCareerUncheckedUpdateManyWithoutIntershipNestedInputSchema).optional(),
});

export const IntershipUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.IntershipUncheckedUpdateManyWithoutCompanyInput> = z.strictObject({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  arm: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  rrhh: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interview_timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  knowledge: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  requirements: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  payment: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  timetable: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  position: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  benefits: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  interns: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  workplace: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  modality: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  link: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  mail: z
    .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
    .optional()
    .nullable(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const IntershipFindFirstArgsSchema: z.ZodType<Prisma.IntershipFindFirstArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    where: IntershipWhereInputSchema.optional(),
    orderBy: z.union([IntershipOrderByWithRelationInputSchema.array(), IntershipOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([IntershipScalarFieldEnumSchema, IntershipScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const IntershipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IntershipFindFirstOrThrowArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    where: IntershipWhereInputSchema.optional(),
    orderBy: z.union([IntershipOrderByWithRelationInputSchema.array(), IntershipOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([IntershipScalarFieldEnumSchema, IntershipScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const IntershipFindManyArgsSchema: z.ZodType<Prisma.IntershipFindManyArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    where: IntershipWhereInputSchema.optional(),
    orderBy: z.union([IntershipOrderByWithRelationInputSchema.array(), IntershipOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([IntershipScalarFieldEnumSchema, IntershipScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const IntershipAggregateArgsSchema: z.ZodType<Prisma.IntershipAggregateArgs> = z
  .object({
    where: IntershipWhereInputSchema.optional(),
    orderBy: z.union([IntershipOrderByWithRelationInputSchema.array(), IntershipOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const IntershipGroupByArgsSchema: z.ZodType<Prisma.IntershipGroupByArgs> = z
  .object({
    where: IntershipWhereInputSchema.optional(),
    orderBy: z.union([IntershipOrderByWithAggregationInputSchema.array(), IntershipOrderByWithAggregationInputSchema]).optional(),
    by: IntershipScalarFieldEnumSchema.array(),
    having: IntershipScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const IntershipFindUniqueArgsSchema: z.ZodType<Prisma.IntershipFindUniqueArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    where: IntershipWhereUniqueInputSchema,
  })
  .strict();

export const IntershipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IntershipFindUniqueOrThrowArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    where: IntershipWhereUniqueInputSchema,
  })
  .strict();

export const CareerFindFirstArgsSchema: z.ZodType<Prisma.CareerFindFirstArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    where: CareerWhereInputSchema.optional(),
    orderBy: z.union([CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema]).optional(),
    cursor: CareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([CareerScalarFieldEnumSchema, CareerScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const CareerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CareerFindFirstOrThrowArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    where: CareerWhereInputSchema.optional(),
    orderBy: z.union([CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema]).optional(),
    cursor: CareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([CareerScalarFieldEnumSchema, CareerScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const CareerFindManyArgsSchema: z.ZodType<Prisma.CareerFindManyArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    where: CareerWhereInputSchema.optional(),
    orderBy: z.union([CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema]).optional(),
    cursor: CareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([CareerScalarFieldEnumSchema, CareerScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const CareerAggregateArgsSchema: z.ZodType<Prisma.CareerAggregateArgs> = z
  .object({
    where: CareerWhereInputSchema.optional(),
    orderBy: z.union([CareerOrderByWithRelationInputSchema.array(), CareerOrderByWithRelationInputSchema]).optional(),
    cursor: CareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const CareerGroupByArgsSchema: z.ZodType<Prisma.CareerGroupByArgs> = z
  .object({
    where: CareerWhereInputSchema.optional(),
    orderBy: z.union([CareerOrderByWithAggregationInputSchema.array(), CareerOrderByWithAggregationInputSchema]).optional(),
    by: CareerScalarFieldEnumSchema.array(),
    having: CareerScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const CareerFindUniqueArgsSchema: z.ZodType<Prisma.CareerFindUniqueArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    where: CareerWhereUniqueInputSchema,
  })
  .strict();

export const CareerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CareerFindUniqueOrThrowArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    where: CareerWhereUniqueInputSchema,
  })
  .strict();

export const IntershipCareerFindFirstArgsSchema: z.ZodType<Prisma.IntershipCareerFindFirstArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    where: IntershipCareerWhereInputSchema.optional(),
    orderBy: z.union([IntershipCareerOrderByWithRelationInputSchema.array(), IntershipCareerOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipCareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([IntershipCareerScalarFieldEnumSchema, IntershipCareerScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const IntershipCareerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IntershipCareerFindFirstOrThrowArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    where: IntershipCareerWhereInputSchema.optional(),
    orderBy: z.union([IntershipCareerOrderByWithRelationInputSchema.array(), IntershipCareerOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipCareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([IntershipCareerScalarFieldEnumSchema, IntershipCareerScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const IntershipCareerFindManyArgsSchema: z.ZodType<Prisma.IntershipCareerFindManyArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    where: IntershipCareerWhereInputSchema.optional(),
    orderBy: z.union([IntershipCareerOrderByWithRelationInputSchema.array(), IntershipCareerOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipCareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([IntershipCareerScalarFieldEnumSchema, IntershipCareerScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const IntershipCareerAggregateArgsSchema: z.ZodType<Prisma.IntershipCareerAggregateArgs> = z
  .object({
    where: IntershipCareerWhereInputSchema.optional(),
    orderBy: z.union([IntershipCareerOrderByWithRelationInputSchema.array(), IntershipCareerOrderByWithRelationInputSchema]).optional(),
    cursor: IntershipCareerWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const IntershipCareerGroupByArgsSchema: z.ZodType<Prisma.IntershipCareerGroupByArgs> = z
  .object({
    where: IntershipCareerWhereInputSchema.optional(),
    orderBy: z.union([IntershipCareerOrderByWithAggregationInputSchema.array(), IntershipCareerOrderByWithAggregationInputSchema]).optional(),
    by: IntershipCareerScalarFieldEnumSchema.array(),
    having: IntershipCareerScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const IntershipCareerFindUniqueArgsSchema: z.ZodType<Prisma.IntershipCareerFindUniqueArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    where: IntershipCareerWhereUniqueInputSchema,
  })
  .strict();

export const IntershipCareerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IntershipCareerFindUniqueOrThrowArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    where: IntershipCareerWhereUniqueInputSchema,
  })
  .strict();

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereInputSchema.optional(),
    orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
    cursor: CompanyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereInputSchema.optional(),
    orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
    cursor: CompanyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereInputSchema.optional(),
    orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
    cursor: CompanyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z
  .object({
    where: CompanyWhereInputSchema.optional(),
    orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
    cursor: CompanyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z
  .object({
    where: CompanyWhereInputSchema.optional(),
    orderBy: z.union([CompanyOrderByWithAggregationInputSchema.array(), CompanyOrderByWithAggregationInputSchema]).optional(),
    by: CompanyScalarFieldEnumSchema.array(),
    having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereUniqueInputSchema,
  })
  .strict();

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereUniqueInputSchema,
  })
  .strict();

export const IntershipCreateArgsSchema: z.ZodType<Prisma.IntershipCreateArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    data: z.union([IntershipCreateInputSchema, IntershipUncheckedCreateInputSchema]),
  })
  .strict();

export const IntershipUpsertArgsSchema: z.ZodType<Prisma.IntershipUpsertArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    where: IntershipWhereUniqueInputSchema,
    create: z.union([IntershipCreateInputSchema, IntershipUncheckedCreateInputSchema]),
    update: z.union([IntershipUpdateInputSchema, IntershipUncheckedUpdateInputSchema]),
  })
  .strict();

export const IntershipCreateManyArgsSchema: z.ZodType<Prisma.IntershipCreateManyArgs> = z
  .object({
    data: z.union([IntershipCreateManyInputSchema, IntershipCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const IntershipCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IntershipCreateManyAndReturnArgs> = z
  .object({
    data: z.union([IntershipCreateManyInputSchema, IntershipCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const IntershipDeleteArgsSchema: z.ZodType<Prisma.IntershipDeleteArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    where: IntershipWhereUniqueInputSchema,
  })
  .strict();

export const IntershipUpdateArgsSchema: z.ZodType<Prisma.IntershipUpdateArgs> = z
  .object({
    select: IntershipSelectSchema.optional(),
    include: IntershipIncludeSchema.optional(),
    data: z.union([IntershipUpdateInputSchema, IntershipUncheckedUpdateInputSchema]),
    where: IntershipWhereUniqueInputSchema,
  })
  .strict();

export const IntershipUpdateManyArgsSchema: z.ZodType<Prisma.IntershipUpdateManyArgs> = z
  .object({
    data: z.union([IntershipUpdateManyMutationInputSchema, IntershipUncheckedUpdateManyInputSchema]),
    where: IntershipWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const IntershipUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.IntershipUpdateManyAndReturnArgs> = z
  .object({
    data: z.union([IntershipUpdateManyMutationInputSchema, IntershipUncheckedUpdateManyInputSchema]),
    where: IntershipWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const IntershipDeleteManyArgsSchema: z.ZodType<Prisma.IntershipDeleteManyArgs> = z
  .object({
    where: IntershipWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const CareerCreateArgsSchema: z.ZodType<Prisma.CareerCreateArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    data: z.union([CareerCreateInputSchema, CareerUncheckedCreateInputSchema]),
  })
  .strict();

export const CareerUpsertArgsSchema: z.ZodType<Prisma.CareerUpsertArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    where: CareerWhereUniqueInputSchema,
    create: z.union([CareerCreateInputSchema, CareerUncheckedCreateInputSchema]),
    update: z.union([CareerUpdateInputSchema, CareerUncheckedUpdateInputSchema]),
  })
  .strict();

export const CareerCreateManyArgsSchema: z.ZodType<Prisma.CareerCreateManyArgs> = z
  .object({
    data: z.union([CareerCreateManyInputSchema, CareerCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CareerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CareerCreateManyAndReturnArgs> = z
  .object({
    data: z.union([CareerCreateManyInputSchema, CareerCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CareerDeleteArgsSchema: z.ZodType<Prisma.CareerDeleteArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    where: CareerWhereUniqueInputSchema,
  })
  .strict();

export const CareerUpdateArgsSchema: z.ZodType<Prisma.CareerUpdateArgs> = z
  .object({
    select: CareerSelectSchema.optional(),
    include: CareerIncludeSchema.optional(),
    data: z.union([CareerUpdateInputSchema, CareerUncheckedUpdateInputSchema]),
    where: CareerWhereUniqueInputSchema,
  })
  .strict();

export const CareerUpdateManyArgsSchema: z.ZodType<Prisma.CareerUpdateManyArgs> = z
  .object({
    data: z.union([CareerUpdateManyMutationInputSchema, CareerUncheckedUpdateManyInputSchema]),
    where: CareerWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const CareerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CareerUpdateManyAndReturnArgs> = z
  .object({
    data: z.union([CareerUpdateManyMutationInputSchema, CareerUncheckedUpdateManyInputSchema]),
    where: CareerWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const CareerDeleteManyArgsSchema: z.ZodType<Prisma.CareerDeleteManyArgs> = z
  .object({
    where: CareerWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const IntershipCareerCreateArgsSchema: z.ZodType<Prisma.IntershipCareerCreateArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    data: z.union([IntershipCareerCreateInputSchema, IntershipCareerUncheckedCreateInputSchema]),
  })
  .strict();

export const IntershipCareerUpsertArgsSchema: z.ZodType<Prisma.IntershipCareerUpsertArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    where: IntershipCareerWhereUniqueInputSchema,
    create: z.union([IntershipCareerCreateInputSchema, IntershipCareerUncheckedCreateInputSchema]),
    update: z.union([IntershipCareerUpdateInputSchema, IntershipCareerUncheckedUpdateInputSchema]),
  })
  .strict();

export const IntershipCareerCreateManyArgsSchema: z.ZodType<Prisma.IntershipCareerCreateManyArgs> = z
  .object({
    data: z.union([IntershipCareerCreateManyInputSchema, IntershipCareerCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const IntershipCareerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IntershipCareerCreateManyAndReturnArgs> = z
  .object({
    data: z.union([IntershipCareerCreateManyInputSchema, IntershipCareerCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const IntershipCareerDeleteArgsSchema: z.ZodType<Prisma.IntershipCareerDeleteArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    where: IntershipCareerWhereUniqueInputSchema,
  })
  .strict();

export const IntershipCareerUpdateArgsSchema: z.ZodType<Prisma.IntershipCareerUpdateArgs> = z
  .object({
    select: IntershipCareerSelectSchema.optional(),
    include: IntershipCareerIncludeSchema.optional(),
    data: z.union([IntershipCareerUpdateInputSchema, IntershipCareerUncheckedUpdateInputSchema]),
    where: IntershipCareerWhereUniqueInputSchema,
  })
  .strict();

export const IntershipCareerUpdateManyArgsSchema: z.ZodType<Prisma.IntershipCareerUpdateManyArgs> = z
  .object({
    data: z.union([IntershipCareerUpdateManyMutationInputSchema, IntershipCareerUncheckedUpdateManyInputSchema]),
    where: IntershipCareerWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const IntershipCareerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.IntershipCareerUpdateManyAndReturnArgs> = z
  .object({
    data: z.union([IntershipCareerUpdateManyMutationInputSchema, IntershipCareerUncheckedUpdateManyInputSchema]),
    where: IntershipCareerWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const IntershipCareerDeleteManyArgsSchema: z.ZodType<Prisma.IntershipCareerDeleteManyArgs> = z
  .object({
    where: IntershipCareerWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    data: z.union([CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema]),
  })
  .strict();

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereUniqueInputSchema,
    create: z.union([CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema]),
    update: z.union([CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema]),
  })
  .strict();

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z
  .object({
    data: z.union([CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CompanyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyCreateManyAndReturnArgs> = z
  .object({
    data: z.union([CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    where: CompanyWhereUniqueInputSchema,
  })
  .strict();

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z
  .object({
    select: CompanySelectSchema.optional(),
    include: CompanyIncludeSchema.optional(),
    data: z.union([CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema]),
    where: CompanyWhereUniqueInputSchema,
  })
  .strict();

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z
  .object({
    data: z.union([CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema]),
    where: CompanyWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const CompanyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyUpdateManyAndReturnArgs> = z
  .object({
    data: z.union([CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema]),
    where: CompanyWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z
  .object({
    where: CompanyWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();
