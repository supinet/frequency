type PrismaModelDelegate = {
  findMany: (args: {
    where: Record<string, any>;
    select: { [key: string]: boolean };
  }) => Promise<{ [key: string]: any }[]>;
};

export async function generateUniqueName(
  baseName: string,
  model: PrismaModelDelegate,
  field: string = 'name',
  additionalWhere: Record<string, any> = {},
): Promise<string> {
  const existingItems = await model.findMany({
    where: {
      ...additionalWhere,
      [field]: {
        startsWith: baseName,
      },
    },
    select: {
      [field]: true,
    },
  });

  const usedNames = new Set(existingItems.map((item) => item[field]));
  let counter = 0;
  let finalName: string;

  do {
    finalName = counter === 0 ? baseName : `${baseName} (${counter})`;
    counter++;
  } while (usedNames.has(finalName));

  return finalName;
}
