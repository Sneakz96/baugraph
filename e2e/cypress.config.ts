import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run bau:serve:development',
        production: 'nx run bau:serve:production',
      },
      ciWebServerCommand: 'nx run bau:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
