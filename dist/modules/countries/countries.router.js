"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countries_controller_1 = require("./countries.controller");
const countriesRouter = (0, express_1.Router)();
console.log('Estoy en countriesRouter');
countriesRouter.get('', countries_controller_1.getAllCountries);
exports.default = countriesRouter;
