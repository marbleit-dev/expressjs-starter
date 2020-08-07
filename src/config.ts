/**
 * @file Defines all constants required for application configuration.
 * @author Marble IT
 */
const config = {
    databaseUrl: 'mongodb://localhost/<NAME_OF_YOUR_DATABASE>',
    port: 3000,
    saltRounds: 10,
    secret: 'qwertyuiopasdfghjklzxcvbnm1234567890',
    tokenExpirySeconds: 14400,
};

export default config;
