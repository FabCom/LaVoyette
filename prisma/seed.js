const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const lorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus dolorum illum excepturi optio! Eos sunt magnam, officia nemo dignissimos animi voluptatum velit sapiente mollitia quibusdam quidem debitis, odit necessitatibus ipsam.\n Voluptates error veritatis maxime officiis doloribus, recusandae a est qui ad laudantium praesentium adipisci assumenda iste dolorum cupiditate consectetur labore blanditiis ducimus saepe inventore voluptatem perspiciatis deleniti modi vero. Nemo.\n Eum, reiciendis, officiis temporibus quia saepe, amet porro cumque consequuntur voluptatum ipsa laboriosam tenetur explicabo illum quas. Assumenda explicabo possimus et facilis. Libero possimus esse adipisci, totam cupiditate assumenda corporis."

const fakePlays = [
  {
    title: "Bienvenue à Chicon-la-Vallée",
    abstract: lorem,
    duration: 60,
  },
  {
    title: "Le contournement",
    abstract: lorem,
    duration: 90,
  },
]

const fakeAudienceCategories = [
  {title: "Tout public"},
  {title: "Scolaire"},
  {title: "Habitants"},
  {title: "Élu·e·s"}
]

const fakeTags = [
  {title: "Pièce participative"},
  {title: "Drame"},
  {title: "Comique"},
  {title: "Création"}
]

async function main() {
  await prisma.audienceCategory.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.play.deleteMany({});

  await prisma.audienceCategory.createMany({
    data: fakeAudienceCategories
  });

  await prisma.tag.createMany({
    data: fakeTags
  });

  await prisma.play.createMany({
    data: fakePlays
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
