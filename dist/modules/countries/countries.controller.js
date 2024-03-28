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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = void 0;
const error_handle_1 = require("../../utils/error.handle");
const countries_service_1 = require("./countries.service");
const getAllCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Controlador de Countries');
        const allCountries = yield (0, countries_service_1.getCountriesFromDB)();
        res.status(200).send(allCountries);
    }
    catch (error) {
        (0, error_handle_1.errorHandle)(res, 'ERROR_GET_COUNTRIES', error);
    }
});
exports.getAllCountries = getAllCountries;
