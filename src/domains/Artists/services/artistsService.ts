import { Artists } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import {QueryError} from  "../../../../errors/errors/QueryError";    
import {InvalidParamError} from  "../../../../errors/errors/InvalidParamError"; 
import {InvalidRouteError} from  "../../../../errors/errors/InvalidRouteError"; 
import { isValidPhoto, isEmpty } from "../../../../utils/auxiliary/auxiliaryFunctions"
class artistsService {
    async createArtist(artist: Artists) {
        
        if (isEmpty(artist.name) || !isValidPhoto(artist.photo) || isNaN(artist.streams)) 
            throw new InvalidParamError('Invalid param');


        const newArtist: Artists | null = await prisma.artists.create({
            data: artist
        });

        if(!newArtist)
            throw new Error("Something happened");
        
        return newArtist;

    }

    async getArtistById(id: number) {
        
            if (isNaN(id)) {
                throw new InvalidParamError('Invalid param');
            }

            const artist: Artists | null = await prisma.artists.findUnique({
                where: { id },
            });
            
            if (!artist) 
                throw new QueryError("This account doesn't exist");
            
            return artist;
        
    }

    async updateArtistById(id: number, artist: Artists) {
    
        if (isEmpty(artist.name) || isValidPhoto(artist.photo) ||
        isNaN(artist.streams) || isNaN(id)) 
            throw new InvalidParamError('Invalid param');

        
        const artistExist : Artists | null = await prisma.artists.findFirst({
            where : {
                id: id
            }
        })

        if (!artistExist) 
            throw new QueryError("This artist doesn't exist");
        
        const updatedArtist = await prisma.artists.update({
            data: artist,
            where: { id }
        });

        if(!updatedArtist)
            throw new Error("Something happened");
        
        return updatedArtist;
        
    }

    async removeArtistById(id: number) {
        try {
            if (isNaN(id)) {
                throw new InvalidParamError("Invalid artist ID");
            }
            const deletedArtist: Artists | null = await prisma.artists.delete({
                where: { id }
            });
            return deletedArtist;
        } catch (error) {
            throw new QueryError("Failed to delete artist");
        }
    }

    async getAllArtists() {
        try {
            const artists: Artists[] = await prisma.artists.findMany({
                orderBy: { name: 'asc' }
            });
            return artists;
        } catch (error) {
            throw new QueryError("Failed to retrieve artists");
        }
    }
}

export default artistsService;
