module.exports = {
  generator: [
    {
      input: 'http://192.168.1.103:8081/auth/v3/api-docs',

      platform: 'swagger',

      output: 'src/api',

      responseMediaType: 'application/json',

      bodyMediaType: 'application/json',

      version: 'auto',

      type: 'auto',

      global: 'Apis',
    },
  ],
}
