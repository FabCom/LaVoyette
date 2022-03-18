const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

const fakePlays = [
  {
    title: "Bienvenue à Chicon-la-Vallée",
    abstract: faker.lorem.paragraphs(5),
    duration: 60,
  },
  {
    title: "Le contournement",
    abstract: faker.lorem.paragraphs(5),
    duration: 90,
  },
];

const fakeTayloredPlays = [
  {
    title: "Promenade urbaine",
    concept: faker.lorem.paragraphs(5),
  },
  {
    title: "Lecture publique",
    concept: faker.lorem.paragraphs(5),
  },
];

const fakeAudienceCategories = [
  { title: "Tout public" },
  { title: "Scolaire" },
  { title: "Habitants" },
  { title: "Élu·e·s" },
];

const fakeTags = [
  { title: "Pièce participative" },
  { title: "Drame" },
  { title: "Comique" },
  { title: "Création" },
];

const fakeArtists = Array(8)
  .fill()
  .map((item) => ({
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    biography: faker.lorem.paragraphs(3),
  }));

const fakeCompany = {
  name: "La Voyette",
  description: faker.lorem.paragraphs(5),
  email: faker.internet.email(),
};

async function main() {
  await prisma.audienceCategory.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.play.deleteMany({});

  await prisma.audienceCategory.createMany({
    data: fakeAudienceCategories,
  });

  await prisma.tag.createMany({
    data: fakeTags,
  });

  await prisma.play.createMany({
    data: fakePlays,
  });

  await prisma.tayloredPlay.createMany({
    data: fakeTayloredPlays,
  });

  await prisma.artist.createMany({
    data: fakeArtists,
  });

  await prisma.company.createMany({ data: [fakeCompany] });
  const the_company = await prisma.company.findMany({
    where: { name: "La Voyette" },
  });
  // console.log(the_company);
  let startDate = new Date();
  let endDate = new Date();
  const fakeCompanyStories = Array(10)
    .fill()
    .map((item) => ({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      start: startDate,
      companyId: the_company[0].id,
    }));

  const fakeCompanyPartners = Array(5)
    .fill()
    .map((item) => ({
      name: faker.company.companyName(),
      description: faker.lorem.paragraph(),
      logo_src: faker.image.imageUrl(200, 100, undefined, 1),
      companyId: the_company[0].id,
    }));
  await prisma.companyStory.createMany({ data: fakeCompanyStories });
  await prisma.companyPartner.createMany({ data: fakeCompanyPartners });

  const plays = await prisma.play.findMany();
  // console.log(plays);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
