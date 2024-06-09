import { Musics, Artists } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import { isEmpty } from "../../../../utils/auxiliary/auxiliaryFunctions";
import { InvalidParamError } from "../../../../errors/errors/InvalidParamError";
import { QueryError } from "../../../../errors/errors/QueryError";


class musicsService {

    async createMusic(music: Musics) {
        
        if (isEmpty(music.name) || isEmpty(music.genre) || isEmpty(music.album) || isNaN(music.artistId))
            throw new InvalidParamError('Invalid param');

        const artistExist : Artists | null = await prisma.artists.findFirst({
            where : {
                id: music.id
            }
        })

        if (!artistExist) 
            throw new QueryError("There's no such an artist");

        await prisma.musics.create({
            data: music
        });
        
    }

    async getMusics() {
        const musics : Musics[] | null = await prisma.musics.findMany({
            orderBy: { name: "asc" }
        });

        if(!musics)
            throw new QueryError("Database empty");

        return musics;
    }

    async getMusicById(id: number) {
        
        if (isNaN(id))
            throw new InvalidParamError('Invalid param');

        const music: Musics | null = await prisma.musics.findUnique({
            where: {
                id: id,
            },
        });

        if(!music)
            throw new QueryError("There's no such a music");

        return music;
    
    }

    async updateMusicById(id: number, music: Musics) {
        
        if (isEmpty(music.name) || isEmpty(music.genre) ||
        isEmpty(music.album) || isNaN(music.artistId) || isNaN(id))
            throw new InvalidParamError('Invalid param');

        const musicExist: Musics | null = await prisma.musics.findFirst({
            where: {
                id: id
            },
        });

        if(!musicExist)
            throw new QueryError("There's no such a music");

        const artistExist : Artists | null = await prisma.artists.findFirst({
            where: {
                id: music.artistId
            }
        })

        if (!artistExist) 
            throw new QueryError("There's no such an artist");

        const updatedMusic = await prisma.musics.update({
            data: music,
            where: { id: id }
        });
        
        if(!updatedMusic)
            throw new Error("Something happened");

        return updatedMusic;
    }

    async removeMusicById(id : number) {

        if (isNaN(id))
            throw new InvalidParamError('Invalid param');

        const musicExist: Musics | null = await prisma.musics.findFirst({
            where: {
                id: id
            },
        });

        if(!musicExist)
            throw new QueryError("There's no such a music");
        
        const removedMusic: Musics | null = await prisma.musics.delete({
            where: {
                id: id
            }           
        });

        if(!removedMusic)
            throw new Error("Something happened");

        return removedMusic;
        
    }

    async getAllMusicsByArtistId(artistId: number) {

        if (isNaN(artistId))
            throw new InvalidParamError('Invalid param');

        const artistExist : Artists | null = await prisma.artists.findFirst({
            where : {
                id: artistId
            }
        })

        if (!artistExist) 
            throw new QueryError("There's no such an artist");

        const musics : Musics[] | null = await prisma.musics.findMany({
            where: {
                artistId: artistId
            },
            orderBy: { name: "asc" },
        });

        if (!musics)
            throw new QueryError("Database empty");

        return musics;
    }
}

export default musicsService;

