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
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
class artistasService {
    createArtista(artistas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.artistas.create({
                    data: artistas
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getArtistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const artist = yield prismaClient_1.default.artistas.findUnique({
                    where: {
                        id: id,
                    },
                });
                return artist;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateArtistById(id, artista) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const artist = yield prismaClient_1.default.artistas.update({
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
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeArtistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const artist = yield prismaClient_1.default.artistas.delete({
                    where: {
                        id: id
                    }
                });
                return artist;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = artistasService;
//# sourceMappingURL=artistasService.js.map