import { Artistas } from "@prisma/client";
import prisma from "../../../config/prismaClient";

class artistasService {
    async createArtista(artistas:Omit<Artistas, 'id'>) {
        try {
            const artist: Artistas | null =await prisma.artistas.create({
                data: artistas
            });
            return artist;
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

    async updateArtistById(id: number, artista: Partial<Artistas>) {
        try {
            const updatedArtist = await prisma.artistas.update({
                data: artista,
                where: { id: id }
            });
            return updatedArtist;
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
