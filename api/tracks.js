const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
module.exports = router;


router.get("/", async (req, res, next) => {
    try {
        const tracks = await prisma.track.findMany(); 
        res.json(tracks);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const tracks = await prisma.track.findUniqueOrThrow({
            where: { id: +id },
        }); 
        res.json(tracks);
    } catch (e) {
        next(e);
    }
});