import { Artistas, Musicas } from "@prisma/client";
import prisma from "../../config/prismaClient";

class musicasService {

    async createMusica(musica : Musicas)
    {
        try {
            await prisma.musicas.create({
                data: musica
            });    

        } catch (error) {
            throw error;
        }
        
    }

    async getMusicaById(id: number) {
        try {
            const musica: Musicas | null = await prisma.musicas.findUnique({
                where: {
                    id: id,
                },
            });
            return musica;
        } catch (error) {
            throw error;
        }
    }

    async updateMusicaById(id: number, musica : Musicas) {
        try {
            await prisma.musicas.update({
                data: musica,
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

}