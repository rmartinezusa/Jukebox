const prisma = require("../prisma");
const { faker } = require('@faker-js/faker');

async function seed(numUsers = 5, numTracks = 20, numPlaylists = 10) {
    const users = Array.from({ length: numUsers }, (_, i) => ({
        username: faker.internet.userName(),
    }));
    await prisma.user.createMany({data: users});

    const tracks = Array.from({ length: numTracks }, (_, i) => ({
        name: faker.music.songName(),
    }));
    await prisma.track.createMany({data: tracks});

    for (let i = 0; i < numPlaylists; i++) {

        const tracks = Array.from({length: 8}, () => ({
            id: Math.floor(Math.random() * numTracks) + 1,
        }));
  
        await prisma.playlist.create({
            data: {
                name: faker.music.genre(),
                description: faker.lorem.sentence(),
                ownerId: 1 + Math.floor(Math.random() * users.length),
                tracks: { connect: tracks, },
            },
        });
    }
}

seed()