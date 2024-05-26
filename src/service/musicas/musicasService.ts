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

}