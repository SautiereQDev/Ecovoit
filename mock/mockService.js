import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  user_all,
  user_getById,
  user_auth,
  user_register,
} from "./mockUserController";

const mock = new AxiosMockAdapter(axios, { delayResponse: 800 });

export default function mockService() {
  console.log("> Démarrage du mockService");

  /**
   * Consulter tous les utilisateurs
   */
  mock
    .onGet("https://ecovoit-api.com/users")
    .reply((config) => user_all(config));

  /**
   * Consulter un utilisateur par id
   */
  mock
    .onGet(/https:\/\/ecovoit-api\.com\/user\/(\d+)/)
    .reply((config) => user_getById(config));

  /**
   * Authentification d'un utilisateur
   */
  mock
    .onPost("https://ecovoit-api.com/login")
    .reply((config) => user_auth(config));

  /**
   * Ajout d'un utilisateur
   */
  mock
    .onPost("https://ecovoit-api.com/register")
    .reply((config) => user_register(config));
}
