/**
 * Configuração do Remotion para a linha de comando.
 * Todas as opções: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
// PNG mantém as cores chapadas exatas; JPEG deixaria ruído que engorda o GIF.
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
// A máquina de trabalho tem 8 GB de RAM: um navegador por vez.
Config.setConcurrency(1);
