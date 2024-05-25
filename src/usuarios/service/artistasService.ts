import { Artistas } from "@prisma/client";
import prisma from "../../config/prismaClient";

class artistasService {
    async createArtista(artistas: Artistas) {
        try {
            await prisma.artistas.create({
                data: artistas
            });
        } catch (error) {
            throw error;
        }
    }

    async getArtistById(id: number) {
        try {
            const artist: Artistas | null = await prisma.artistas.findUnique({
                where: {
                    id: id,
                },
            });
            return artist;
        } catch (error) {
            throw error;
        }
    }

    async updateArtistById(id: number, artista: Artistas) {
        try {
            const artist: Artistas | null = await prisma.artistas.update({
                data: {
                    nome: artista.nome,
                    foto: artista.foto,
                    streams: artista.streams 
                },
                where: {
                    id: id
                }
            });
            return artist;
        } catch (error) {
            throw error;
        }
    }

    async removeArtistById(id : number) {
        try {
            const artist: Artistas | null = await prisma.artistas.delete({
                where: {
                    id: id
                }           
            });
            return artist;
        } catch (error) {
            throw error;
        }
    }
}

export default artistasService;
