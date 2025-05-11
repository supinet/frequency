import { PrismaClient, THERAPY_STATUS, USER_TYPE } from '@prisma/client';
import * as users from './mocks/users.json';
import * as therapies from './mocks/therapies.json';
import * as userTherapies from './mocks/therapies-assignments.json';

const prisma = new PrismaClient();

async function main() {
  /**
   * users
   */
  const userMap: { [id: string]: any } = {};

  for (const user of users) {
    const upserted = await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        type: USER_TYPE[user.type as keyof typeof USER_TYPE],
        birthDay: new Date(user.birthDay),
        logo: user.logo,
        address: user.address,
      },
    });
    userMap[user.id] = upserted;
  }
  console.log(userMap);

  /**
   * therapies
   */
  const therapyMap: { [id: string]: any } = {};

  for (const therapy of therapies) {
    const upserted = await prisma.therapy.upsert({
      where: { id: therapy.id },
      update: {},
      create: {
        name: therapy.title,
        description: therapy.description,
        status: THERAPY_STATUS.DRAFT,
        year: new Date().getFullYear(),
      },
    });
    therapyMap[therapy.id] = upserted;
  }
  console.log(therapyMap);

  /**
   * user therapies
   */

  const usersByEmail = Object.values(userMap).reduce(
    (acc, user) => {
      acc[user.email] = user;
      return acc;
    },
    {} as { [email: string]: any },
  );

  console.log('usersByEmail', usersByEmail);

  const therapiesById = Object.values(therapyMap).reduce(
    (acc, therapy) => {
      acc[therapy.id] = therapy;
      return acc;
    },
    {} as { [id: string]: any },
  );

  console.log('therapiesById', therapiesById);
  for (const assignment of userTherapies) {
    const therapyDate = new Date(assignment.therapyDate);
    const startDate = new Date(therapyDate);
    startDate.setHours(assignment.startHour, 0, 0, 0);
    const endDate = new Date(therapyDate);
    endDate.setHours(assignment.endHour, 0, 0, 0);

    await prisma.userTherapy.upsert({
      where: {
        patientId_applicatorId_tutorId_therapyId_therapyDate: {
          patientId: assignment.patientId,
          applicatorId: assignment.applicatorId,
          tutorId: assignment.tutorId,
          therapyId: assignment.therapyId,
          therapyDate,
        },
      },
      update: {},
      create: {
        patientId: assignment.patientId,
        applicatorId: assignment.applicatorId,
        tutorId: assignment.tutorId,
        ownerId: assignment.ownerId,
        therapyId: assignment.therapyId,
        therapyDate,
        startDate,
        endDate,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(`error Seed Failed `, e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
