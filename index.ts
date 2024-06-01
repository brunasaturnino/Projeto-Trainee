import artistasService from "./src/domains/Artistas/services/artistasService";
import musicasService from "./src/domains/Musicas/services/musicasService"
import usuariosService from "./src/domains/Usuarios/services/usersService";
import { Artistas, Musicas, Usuarios } from "@prisma/client"; 

const service = new artistasService();
const serviceMusica= new musicasService();
const serviceUsuario = new usuariosService();

async function testCreateArtista(artista : Partial<Artistas>) {

    try {
        const artist = await service.createArtista(artista as Artistas);
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

async function testCreateUsuario(usuario : Partial<Usuarios>) {

    try {
        const newUsuario = await serviceUsuario.createUsuario(usuario as Usuarios);
        console.log("usuario criado:", newUsuario);
    } catch (error) {
        console.error("Erro ao criar usuario:", error);
    }
}

async function testGetUsuarioById(id: number) {
    try {
        const getUsuario = await serviceUsuario.getUserById(id);
        console.log(`Usuario com ID ${id}:`, getUsuario);
    } catch (error) {
        console.error(`Erro ao obter usuario com ID ${id}:`, error);
    }
}

async function testUpdateUsuarioById(id: number, usuario: Partial<Usuarios>) {
    try {
        const upUsuario = await serviceUsuario.updateUserById(id, usuario as Usuarios);
        console.log(`Usuario com ID ${id} atualizado:`, upUsuario);
    } catch (error) {
        console.error(`Erro ao atualizar usuario com ID ${id}:`, error);
    }
}

async function testRemoveUsuarioById(id: number) {
    try {
        const removeUser = await serviceUsuario.removeUserById(id);
        console.log(`Usuario com ID ${id} removido:`, removeUser);
    } catch (error) {
        console.error(`Erro ao remover usuario com ID ${id}:`, error);
    }
}

async function testUsuarioOuviu(idUser: number, idMusic : number) {
    try {
        const upUser = await serviceUsuario.userListenedMusica(idUser, idMusic);
        console.log(`Usuario com ID ${idUser} atualizado:`, upUser);
    } catch (error) {
        console.error(`Erro ao remover usuario com ID ${idUser}:`, error);
    }
}

async function testUsuarioJaOuviu(idUser: number, idMusic : number) {
    try {
        const ans = await serviceUsuario.haveUserListenedMusica(idUser, idMusic);
        console.log(`Usuario com ID ${idUser} ouviu a musica ${idMusic} ? `, ans);
    } catch (error) {
        console.error(`Erro ao atualizar usuario com ID ${idUser}:`, error);
    }
}


async function testCreateMusica(musica : Partial<Musicas>) {

    try {
        const music = await serviceMusica.createMusica(musica as Musicas);
        console.log("Musica criada:", music);
    } catch (error) {
        console.error("Erro ao criar música:", error);
    }
}

async function testGetMusicById(id: number) {
    try {
        const music = await serviceMusica.getMusicById(id);
        console.log(`Música com ID ${id}:`, music);
    } catch (error) {
        console.error(`Erro ao obter música com ID ${id}:`, error);
    }
}

async function testUpdateMusicById(id: number, musica: Partial<Musicas>) {
    try {
        const updatedMusic = await serviceMusica.updateMusicById(id, musica as Musicas);
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



    const newArtist : Partial<Artistas> = { nome: "Jack new", streams: 200 };
    await testCreateArtista(newArtist);    

    await testGetArtistById(1);

    const updateArtist: Partial<Artistas> = { nome: "Billie Updated", streams: 200 };
    await testUpdateArtistById(2, updateArtist);



    const newUser : Partial<Usuarios> = { nome: "Jack new", email:`oi$@gmail.com`, foto:null, privilegio:true, senha:"123" };
    await testCreateUsuario(newUser);    

    const upUser : Partial<Usuarios> = { nome: "João", email:"soares@gmail.com", foto:null, privilegio:true, senha:"123" };
    await testUpdateUsuarioById(1, upUser);


    const newMusic : Partial<Musicas> = { nome: "meteoro da paixa", album: "oi", genero:'salve', artistaId: 1 };
    await testCreateMusica(newMusic);        


    testUsuarioOuviu(1, 1);

    testUsuarioJaOuviu(1, 1);

    await testGetUsuarioById(1);

    await testRemoveUsuarioById(1);

    await testGetMusicById(1);

    const update: Partial<Musicas> = { nome: "Blue Updated", genero: "rock" };
    await testUpdateMusicById(1, update);

    await testRemoveArtistById(2);

    await testRemoveMusicById(2);
}

runTests();