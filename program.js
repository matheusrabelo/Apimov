"use strict";

import Program from "commander";
import PromptCommands from "./promptCommands";

Program
  .version('0.0.1')

Program
  .command('init')
  .description('Run config and server builders')
  .action(PromptCommands.init);

Program
  .command('build')
  .description('Run only server builder')
  .action(PromptCommands.build);

Program
  .command('*')
  .description('Run only server builder')
  .action(() => {console.log("Unknown option")});

Program.parse(process.argv);
