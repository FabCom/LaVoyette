-- CreateTable
CREATE TABLE "TayloredPlay" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "concept" TEXT NOT NULL,

    CONSTRAINT "TayloredPlay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AudienceCategoryToTayloredPlay" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToTayloredPlay" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AudienceCategoryToTayloredPlay_AB_unique" ON "_AudienceCategoryToTayloredPlay"("A", "B");

-- CreateIndex
CREATE INDEX "_AudienceCategoryToTayloredPlay_B_index" ON "_AudienceCategoryToTayloredPlay"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTayloredPlay_AB_unique" ON "_TagToTayloredPlay"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTayloredPlay_B_index" ON "_TagToTayloredPlay"("B");

-- AddForeignKey
ALTER TABLE "_AudienceCategoryToTayloredPlay" ADD FOREIGN KEY ("A") REFERENCES "AudienceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudienceCategoryToTayloredPlay" ADD FOREIGN KEY ("B") REFERENCES "TayloredPlay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTayloredPlay" ADD FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTayloredPlay" ADD FOREIGN KEY ("B") REFERENCES "TayloredPlay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
