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
class usuariosService {
    createUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.usuarios.create({
                    data: usuario
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prismaClient_1.default.usuarios.findFirst({
                    where: {
                        id: id
                    }
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prismaClient_1.default.usuarios.findFirst({
                    where: {
                        email: email
                    }
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    filterByPrivilegios(privilegio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prismaClient_1.default.usuarios.findMany({
                    where: {
                        privilegio: privilegio
                    }
                });
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUserById(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.usuarios.update({
                    data: usuario,
                    where: {
                        id: id
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUserByEmail(email, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.usuarios.update({
                    data: usuario,
                    where: {
                        email: email
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.usuarios.delete({
                    where: {
                        id: id
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.usuarios.delete({
                    where: {
                        email: email
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    haveUserListenedMusica(idUsuario, idMusica) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield prismaClient_1.default.usuarios.findFirst({
                    where: {
                        id: idUsuario
                    },
                    include: {
                        musicas: {
                            where: {
                                id: idMusica
                            }
                        }
                    }
                });
                return (usuario != null);
            }
            catch (error) {
                throw error;
            }
        });
    }
    userListenedMusica(idUsuario, idMusica) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.usuarios.update({
                    where: {
                        id: idUsuario
                    },
                    data: {
                        musicas: {
                            connect: {
                                id: idMusica,
                            },
                        },
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = usuariosService;
//# sourceMappingURL=usuariosService.js.map