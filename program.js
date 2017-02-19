'use strict';

import Program from 'commander';
import Prompt from './prompt';

Program
  .version('0.1.1');

Program
  .command('init')
  .description('Run config and server builders')
  .action(Prompt.init);

Program
  .command('build')
  .description('Run only server builder')
  .action(Prompt.build);

Program
  .command('*')
  .description('Uknown option')
  .action(() => console.log('Unknown option'));

Program.parse(process.argv);
