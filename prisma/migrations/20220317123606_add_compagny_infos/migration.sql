-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "email" TEXT,
ADD COLUMN     "facebook_link" TEXT,
ADD COLUMN     "instagram_link" TEXT,
ALTER COLUMN "biography" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "facebook_link" TEXT,
    "instagram_link" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyStory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "companyId" INTEGER,

    CONSTRAINT "CompanyStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPartner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo_src" TEXT,
    "companyId" INTEGER,

    CONSTRAINT "CompanyPartner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyStory" ADD CONSTRAINT "CompanyStory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPartner" ADD CONSTRAINT "CompanyPartner_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
