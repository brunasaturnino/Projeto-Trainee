import { Artists } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class artistsService {
    async createArtista(artists:Omit<Artists, 'id'>) {
        try {
            const artist: Artists | null =await prisma.artists.create({
                data: artists
            });
            return artist;
        } catch (error) {
            throw error;
        }
    }

    async getArtistById(id: number) {
        try {
            const artist: Artists | null = await prisma.artists.findUnique({
                where: {
                    id: id,
                },
            });
            return artist;
        } catch (error) {
            throw error;
        }
    }

    async updateArtistById(id: number, artista: Partial<Artists>) {
        try {
            const updatedArtist = await prisma.artists.update({
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
            const artist: Artists | null = await prisma.artists.delete({
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

export default artistsService;
