import { Artistas, Musicas } from "@prisma/client";
import prisma from "../../config/prismaClient";

class musicasService {

    async createMusica(musica :Omit<Musicas, 'id'>)
    {
        try {
            const musicas: Musicas | null =await prisma.musicas.create({
                data: musica
            });    
            return musicas;
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

    async removeMusicById(id : number)
    {
        try {
            await prisma.musicas.delete({
                where: {
                    id: id
                }           
            })
        } catch (error) {
            throw error;
        }       
    }

}


export default musicasService;