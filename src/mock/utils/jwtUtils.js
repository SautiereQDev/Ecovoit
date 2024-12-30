import JWT from 'expo-jwt';

/**
 * Vérifie si un JWT est encore valide
 * @param {string} token Un JWT
 * @param {string} key La clef secrète qui a permis de générer le token
 * @returns {import("expo-jwt/dist/types/jwt").JWTDefaultBody | null}
 */
export function parseJWT(token, key) {
  try {
    const decoded = JWT.decode(token, key);
    if (decoded.exp && decoded.exp < Date.now()) {
      const expirationDate = new Date(decoded.exp).toLocaleString();
      throw new Error(`Le token n'est plus valide, expiration : ${expirationDate}`);
    }
    console.log(`Token Valide, expiration : ${new Date(decoded.exp).toLocaleString()}`);

    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Permet de créer un JWT selon un payload, une clef secrète et une date d'expiration exprimé en heure sous la forme "<n>h". Exemple "1h".
 * @param {import("expo-jwt/dist/types/jwt").JWTDefaultBody} payload
 * @param {string} key
 * @param {string} exp
 * @returns {string} Un nouveau JWT
 */
export function createJWT(payload, key, exp) {
  const nbHour = parseInt(exp.slice(0, -1));
  const token = JWT.encode(
    {
      ...payload,
      exp: Date.now() + 1000 * 3600 * nbHour,
    },
    key
  );
  return token;
}
