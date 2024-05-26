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

}