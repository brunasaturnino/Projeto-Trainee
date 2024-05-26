import artistasService from "./src/service/artistas/artistasService";
import musicasService from "./src/service/musicas/musicasService";
import { Artistas, Musicas } from "@prisma/client"; 

const service = new artistasService();
const serviceMusica= new musicasService();

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
        const updatedArtist = await service.updateArtistById(id, artista as Artistas);
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


async function testCreateMusica() {
    const body: Omit<Musicas, 'id'> = {
        nome: "Blue",
        genero: "Pop",
        album: "Hit",
        artistaId: 1,
        usuarioId: null
    };

    try {
        const music = await serviceMusica.createMusica(body);
        console.log("Musica criada:", music);
    } catch (error) {
        console.error("Erro ao criar música:", error);
    }
}

async function testGetMusicById(id: number) {
    try {
        const music = await serviceMusica.getMusicaById(id);
        console.log(`Música com ID ${id}:`, music);
    } catch (error) {
        console.error(`Erro ao obter música com ID ${id}:`, error);
    }
}

async function testUpdateMusicById(id: number, musica: Partial<Musicas>) {
    try {
        const updatedMusic = await serviceMusica.updateMusicaById(id, musica as Musicas);
        console.log(`Música com ID ${id} atualizado:`, updatedMusic);
    } catch (error) {
        console.error(`Erro ao atualizar música com ID ${id}:`, error);
    }
}

async function testRemoveMusicById(id: number) {
    try {
        const removedMusic = await serviceMusica.removeMusicById(id);
        console.log(`Música com ID ${id} removida:`, removedMusic);
    } catch (error) {
        console.error(`Erro ao remover música com ID ${id}:`, error);
    }
}

async function runTests() {
  
    await testCreateArtista();
    
    await testGetArtistById(1);

    const updateData: Partial<Artistas> = { nome: "Billie Updated", streams: 200 };
    await testUpdateArtistById(1, updateData);

    await testCreateMusica();
    
    await testGetMusicById(1);

    const update: Partial<Musicas> = { nome: "Blue Updated", genero: "rock" };
    await testUpdateMusicById(1, update);

    await testRemoveArtistById(1);

    await testRemoveMusicById(1);
}

runTests();
