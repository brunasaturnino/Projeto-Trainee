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
class musicasService {
    createMusica(musicas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.musicas.create({
                    data: musicas
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMusicById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const music = yield prismaClient_1.default.musicas.findUnique({
                    where: {
                        id: id,
                    },
                });
                return music;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateMusicById(id, musica) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMusic = yield prismaClient_1.default.musicas.update({
                    data: musica,
                    where: { id: id }
                });
                return updatedMusic;
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeMusicById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const music = yield prismaClient_1.default.musicas.delete({
                    where: {
                        id: id
                    }
                });
                return music;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = musicasService;
//# sourceMappingURL=musicasService.js.map