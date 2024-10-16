const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
module.exports = router;


router.get("/", async (req, res, next) => {
    try {
      const users = await prisma.user.findMany(); 
      res.json(users);
    } catch (e) {
      next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: +id },
            include: { playlists: true },
        });
        res.json(user);
    } catch (e) {
        next(e);
    }
});