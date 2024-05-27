"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const artistasService_1 = __importDefault(require("./service/artistas/artistasService"));
const musicasService_1 = __importDefault(require("./service/musicas/musicasService"));
const usuariosService_1 = __importDefault(require("./service/usuarios/usuariosService"));
const service = new artistasService_1.default();
const serviceMusica = new musicasService_1.default();
const serviceUsuario = new usuariosService_1.default();
function testCreateArtista(artista) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const artist = yield service.createArtista(artista);
            console.log("Artista criado:", artist);
        }
        catch (error) {
            console.error("Erro ao criar artista:", error);
        }
    });
}
function testGetArtistById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const artist = yield service.getArtistById(id);
            console.log(`Artista com ID ${id}:`, artist);
        }
        catch (error) {
            console.error(`Erro ao obter artista com ID ${id}:`, error);
        }
    });
}
function testUpdateArtistById(id, artista) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedArtist = yield service.updateArtistById(id, artista);
            console.log(`Artista com ID ${id} atualizado:`, updatedArtist);
        }
        catch (error) {
            console.error(`Erro ao atualizar artista com ID ${id}:`, error);
        }
    });
}
function testRemoveArtistById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const removedArtist = yield service.removeArtistById(id);
            console.log(`Artista com ID ${id} removido:`, removedArtist);
        }
        catch (error) {
            console.error(`Erro ao remover artista com ID ${id}:`, error);
        }
    });
}
function testCreateUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUsuario = yield serviceUsuario.createUsuario(usuario);
            console.log("usuario criado:", newUsuario);
        }
        catch (error) {
            console.error("Erro ao criar usuario:", error);
        }
    });
}
function testGetUsuarioById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getUsuario = yield serviceUsuario.getUserById(id);
            console.log(`Usuario com ID ${id}:`, getUsuario);
        }
        catch (error) {
            console.error(`Erro ao obter usuario com ID ${id}:`, error);
        }
    });
}
function testUpdateUsuarioById(id, usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const upUsuario = yield serviceUsuario.updateUserById(id, usuario);
            console.log(`Usuario com ID ${id} atualizado:`, upUsuario);
        }
        catch (error) {
            console.error(`Erro ao atualizar usuario com ID ${id}:`, error);
        }
    });
}
function testRemoveUsuarioById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const removeUser = yield serviceUsuario.removeUserById(id);
            console.log(`Usuario com ID ${id} removido:`, removeUser);
        }
        catch (error) {
            console.error(`Erro ao remover usuario com ID ${id}:`, error);
        }
    });
}
function testUsuarioOuviu(idUser, idMusic) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const upUser = yield serviceUsuario.userListenedMusica(idUser, idMusic);
            console.log(`Usuario com ID ${idUser} atualizado:`, upUser);
        }
        catch (error) {
            console.error(`Erro ao remover usuario com ID ${idUser}:`, error);
        }
    });
}
function testUsuarioJaOuviu(idUser, idMusic) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ans = yield serviceUsuario.haveUserListenedMusica(idUser, idMusic);
            console.log(`Usuario com ID ${idUser} ouviu a musica ${idMusic} ? `, ans);
        }
        catch (error) {
            console.error(`Erro ao atualizar usuario com ID ${idUser}:`, error);
        }
    });
}
function testCreateMusica(musica) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const music = yield serviceMusica.createMusica(musica);
            console.log("Musica criada:", music);
        }
        catch (error) {
            console.error("Erro ao criar música:", error);
        }
    });
}
function testGetMusicById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const music = yield serviceMusica.getMusicById(id);
            console.log(`Música com ID ${id}:`, music);
        }
        catch (error) {
            console.error(`Erro ao obter música com ID ${id}:`, error);
        }
    });
}
function testUpdateMusicById(id, musica) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedMusic = yield serviceMusica.updateMusicById(id, musica);
            console.log(`Música com ID ${id} atualizado:`, updatedMusic);
        }
        catch (error) {
            console.error(`Erro ao atualizar música com ID ${id}:`, error);
        }
    });
}
function testRemoveMusicById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const removedMusic = yield serviceMusica.removeMusicById(id);
            console.log(`Música com ID ${id} removida:`, removedMusic);
        }
        catch (error) {
            console.error(`Erro ao remover música com ID ${id}:`, error);
        }
    });
}
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const newArtist = { nome: "Jack new", streams: 200 };
        yield testCreateArtista(newArtist);
        yield testGetArtistById(1);
        const updateArtist = { nome: "Billie Updated", streams: 200 };
        yield testUpdateArtistById(1, updateArtist);
        const newUser = { nome: "Jack new", email: `oi$@gmail.com`, foto: null, privilegio: true, senha: "123" };
        yield testCreateUsuario(newUser);
        const upUser = { nome: "João", email: "soares@gmail.com", foto: null, privilegio: true, senha: "123" };
        yield testUpdateUsuarioById(1, upUser);
        const newMusic = { nome: "meteoro da paixa", album: "oi", genero: 'salve', artistaId: 1 };
        yield testCreateMusica(newMusic);
        testUsuarioOuviu(1, 1);
        testUsuarioJaOuviu(1, 1);
        yield testGetUsuarioById(1);
        yield testRemoveUsuarioById(1);
        yield testGetMusicById(1);
        const update = { nome: "Blue Updated", genero: "rock" };
        yield testUpdateMusicById(1, update);
        yield testRemoveArtistById(1);
        yield testRemoveMusicById(1);
    });
}
runTests();
//# sourceMappingURL=index.js.map