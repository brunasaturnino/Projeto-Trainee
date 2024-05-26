import artistasService from "./src/service/artistas/artistasService";
import { Artistas } from "@prisma/client"; // Importe a interface do Prisma para usar como tipo

const service = new artistasService();

async function testCreateArtista() {
    const body: Omit<Artistas, 'id'> = {
        nome: "Billie",
        foto: null,
        streams: 100,
    };

    try {
        const artist = await service.createArtista(body);
        console.log("Artista criado:", artist);
    } catch (error) {
        console.error("Erro ao criar artista:", error);
    }
}

async function testGetArtistById(id: number) {
    try {
        const artist = await service.getArtistById(id);
        console.log(`Artista com ID ${id}:`, artist);
    } catch (error) {
        console.error(`Erro ao obter artista com ID ${id}:`, error);
    }
}

async function testUpdateArtistById(id: number, artista: Partial<Artistas>) {
    try {
        const updatedArtist = await service.updateArtistById(id, artista);
        console.log(`Artista com ID ${id} atualizado:`, updatedArtist);
    } catch (error) {
        console.error(`Erro ao atualizar artista com ID ${id}:`, error);
    }
}

async function testRemoveArtistById(id: number) {
    try {
        const removedArtist = await service.removeArtistById(id);
        console.log(`Artista com ID ${id} removido:`, removedArtist);
    } catch (error) {
        console.error(`Erro ao remover artista com ID ${id}:`, error);
    }
}

async function runTestsArtistas() {
  
    await testCreateArtista();
    
    await testGetArtistById(1);

    const updateData: Partial<Artistas> = { nome: "Billie Updated", streams: 200 };
    await testUpdateArtistById(1, updateData);

    await testRemoveArtistById(1);
}

runTestsArtistas();
