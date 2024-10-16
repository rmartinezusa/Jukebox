const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
    try {
      const playlists = await prisma.playlist.findMany(); 
      res.json(playlists);
    } catch (e) {
      next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name, description, ownerId, trackIds } = req.body;

        const playlist = await prisma.playlist.create({
            data: {
                name,
                description,
                ownerId: +ownerId,
                tracks: {connect: trackIds.map((id) => ({ id: +id })) }
            }
        });
        res.json(playlist);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await prisma.playlist.findUniqueOrThrow({
            where: { id: +id },
            include: { tracks: true },
        });
      res.json(user);
    } catch (e) {
        next(e);
    }
});

