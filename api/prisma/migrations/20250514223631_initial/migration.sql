-- CreateEnum
CREATE TYPE "THERAPY_STATUS" AS ENUM ('DRAFT', 'WIP', 'COMPLETED', 'RELEASED');

-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('PHYSICAL_PERSON', 'COMPANY', 'PATIENT', 'TUTOR', 'APPLICATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "USER_TYPE" NOT NULL,
    "birthDay" TIMESTAMP(3),
    "signatureImage" TEXT,
    "logo" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Therapy" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "status" "THERAPY_STATUS" NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Therapy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTherapyAttendance" (
    "id" SERIAL NOT NULL,
    "therapyId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "applicatorId" INTEGER NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "therapyDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserTherapyAttendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTherapyAttendance" ADD CONSTRAINT "UserTherapyAttendance_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "Therapy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapyAttendance" ADD CONSTRAINT "UserTherapyAttendance_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapyAttendance" ADD CONSTRAINT "UserTherapyAttendance_applicatorId_fkey" FOREIGN KEY ("applicatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapyAttendance" ADD CONSTRAINT "UserTherapyAttendance_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapyAttendance" ADD CONSTRAINT "UserTherapyAttendance_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
