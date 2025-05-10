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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Therapy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTherapy" (
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

    CONSTRAINT "UserTherapy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTherapy_patientId_applicatorId_tutorId_therapyId_therap_key" ON "UserTherapy"("patientId", "applicatorId", "tutorId", "therapyId", "therapyDate");

-- AddForeignKey
ALTER TABLE "UserTherapy" ADD CONSTRAINT "UserTherapy_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "Therapy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapy" ADD CONSTRAINT "UserTherapy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapy" ADD CONSTRAINT "UserTherapy_applicatorId_fkey" FOREIGN KEY ("applicatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapy" ADD CONSTRAINT "UserTherapy_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTherapy" ADD CONSTRAINT "UserTherapy_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
