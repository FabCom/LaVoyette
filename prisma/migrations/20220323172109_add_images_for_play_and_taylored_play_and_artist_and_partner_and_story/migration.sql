-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "playId" INTEGER,
    "tayloredPlayId" INTEGER,
    "artistId" INTEGER,
    "companyId" INTEGER,
    "companyStoryId" INTEGER,
    "companyPartnerId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_tayloredPlayId_fkey" FOREIGN KEY ("tayloredPlayId") REFERENCES "TayloredPlay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_companyStoryId_fkey" FOREIGN KEY ("companyStoryId") REFERENCES "CompanyStory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_companyPartnerId_fkey" FOREIGN KEY ("companyPartnerId") REFERENCES "CompanyPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
