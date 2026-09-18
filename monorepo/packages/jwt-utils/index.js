const jwt = require("jsonwebtoken");

/**
 * createJwtUtils(config) -> { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken }
 *
 * config shape:
 * {
 *   accessToken:  { secret, expiresIn },
 *   refreshToken: { secret, expiresIn },
 *   issuer,
 * }
 *
 * Kept as a factory (not a singleton) so each service supplies its own
 * secrets/expiry from its own env - no shared JWT secret across services.
 */
function createJwtUtils(config) {
  const { accessToken, refreshToken, issuer } = config;

  function signAccessToken(payload) {
    return jwt.sign(payload, accessToken.secret, {
      expiresIn: accessToken.expiresIn,
      issuer,
    });
  }

  function signRefreshToken(payload) {
    return jwt.sign(payload, refreshToken.secret, {
      expiresIn: refreshToken.expiresIn,
      issuer,
    });
  }

  function verifyAccessToken(token) {
    return jwt.verify(token, accessToken.secret, { issuer });
  }

  function verifyRefreshToken(token) {
    return jwt.verify(token, refreshToken.secret, { issuer });
  }

  return { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
}

module.exports = createJwtUtils;
