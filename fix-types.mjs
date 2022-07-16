import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';

function fixJestDomType() {
  const typesPath = path.resolve('node_modules', '@types', 'testing-library__jest-dom', 'index.d.ts');
  const refMatcher = /[\r\n]+\/\/\/ <reference types="jest" \/>/;

  fs.readFile(typesPath, 'utf8', (err, data) => {
    if (err) throw err;

    fs.writeFile(typesPath, data.replace(refMatcher, ''), 'utf8', function (err) {
      if (err) throw err;
    });
  });
}

async function fixDeckGlTypes() {
  const typesDist = path.resolve('node_modules', '@types');
  const typesSrc = path.resolve(
    'node_modules',
    '.pnpm',
    '@danmarshall+deckgl-typings@4.9.24',
    'node_modules',
    '@danmarshall',
    'deckgl-typings'
  );

  try {
    await fse.copy(typesSrc, typesDist);
    console.log('DeckGl types was installed!');
  } catch (err) {
    console.error(err);
    console.error('Are you use pnpm?');
  }
}

fixJestDomType()
await fixDeckGlTypes();
