import { Musicas } from "@prisma/client";
import prisma from "./../../../../config/prismaClient";


class musicasService {
    async createMusica(musicas: Musicas) {
        try {
            await prisma.musicas.create({
                data: musicas
            });
        } catch (error) {
            throw error;
        }
    }

    async getMusicById(id: number) {
        try {
            const music: Musicas | null = await prisma.musicas.findUnique({
                where: {
                    id: id,
                },
            });
            return music;
        } catch (error) {
            throw error;
        }
    }

    async updateMusicById(id: number, musica: Partial<Musicas>) {
        try {
            const updatedMusic = await prisma.musicas.update({
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
            const music: Musicas | null = await prisma.musicas.delete({
                where: {
                    id: id
                }           
            });
            return music;
        } catch (error) {
            throw error;
        }
    }
}

export default musicasService;

