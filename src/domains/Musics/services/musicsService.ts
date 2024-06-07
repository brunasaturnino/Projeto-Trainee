import { Musics } from "@prisma/client";
import prisma from "../../../../config/prismaClient";


class musicsService {

    async createMusica(musics: Musics) {
        try {
            await prisma.musics.create({
                data: musics
            });
        } catch (error) {
            throw error;
        }
    }

    async getMusics() {
        return await prisma.musics.findMany({
          orderBy: { name: "asc" },
          include: { artist: true, user: true },
        });
      }

    async getMusicById(id: number) {
        try {
            const music: Musics | null = await prisma.musics.findUnique({
                where: {
                    id: id,
                },
            });
            return music;
        } catch (error) {
            throw error;
        }
    }

    async updateMusicById(id: number, musica: Partial<Musics>) {
        try {
            const updatedMusic = await prisma.musics.update({
                data: musica,
                where: { id: id }
            });
            return updatedMusic;
        } catch (error) {
            throw error;
        }
    }

    async removeMusicById(id : number) {
        try {
            const music: Musics | null = await prisma.musics.delete({
                where: {
                    id: id
                }           
            });
            return music;
        } catch (error) {
            throw error;
        }
    }

    async getAllMusicsByArtistId(artistId: number) {
        return await prisma.musics.findMany({
            where: {
                artistId: artistId
            },
            orderBy: { name: "asc" },
        });
    }
}

export default musicsService;

