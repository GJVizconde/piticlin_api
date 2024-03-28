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
exports.getCountriesFromDB = void 0;
const axios_1 = __importDefault(require("axios"));
const countries_1 = __importDefault(require("../../utils/countries"));
const prisma_1 = require("../../prisma");
const getCountriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countriesDb = yield prisma_1.prisma.country.findMany({});
        console.log(countriesDb);
        if (countriesDb.length === 0) {
            const countriesFromApi = (yield axios_1.default.get('https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=07a2818d03d27b302aaa73fda0c4f85e2f7c0ca2ca6cb63d77bbe2510c52c192')).data.result;
            console.log(countriesFromApi.length);
            const newCountries = [];
            const missedCountries = [];
            countriesFromApi.forEach((country) => {
                if (countries_1.default.includes(country.country_name)) {
                    newCountries.push({
                        id: String(country.country_key),
                        name: country.country_name,
                        flag: country.country_logo
                    });
                }
            });
            for (let i = 0; i < countries_1.default.length; i++) {
                let countryFound = false;
                for (let j = 0; j < newCountries.length; j++) {
                    if (countries_1.default[i] === newCountries[j].name) {
                        countryFound = true;
                        break;
                    }
                }
                if (!countryFound) {
                    missedCountries.push(countries_1.default[i]);
                }
            }
            console.log(missedCountries);
            console.log(typeof newCountries[1].id);
            const countriesData = newCountries.map((country) => ({
                id: country.id,
                name: country.name,
                flag: country.flag
            }));
            // Pasar el array de objetos a createMany
            const data = yield prisma_1.prisma.country.createMany({
                data: countriesData
            });
            return data;
        }
        return countriesDb;
    }
    catch (error) {
        throw error;
    }
});
exports.getCountriesFromDB = getCountriesFromDB;
