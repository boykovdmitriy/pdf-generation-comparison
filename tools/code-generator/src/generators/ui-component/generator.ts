import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { UiComponentGeneratorSchema } from './schema';

export async function uiComponentGenerator(
  tree: Tree,
  options: UiComponentGeneratorSchema
) {
  const indexFile =
    options.type === 'server'
      ? 'libs/ui/src/server.ts'
      : 'libs/ui/src/index.ts';
  const projectRoot = `libs/ui/src/lib/${options.name}`;
  const importPath = `./lib/${options.name}`;

  /*update files index.ts or server.ts files for re-exports*/
  const existingContent = tree.read(indexFile, 'utf-8');
  const updatedContent = `${existingContent}export * from '${importPath}';\n`;
  tree.write(indexFile, updatedContent);

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default uiComponentGenerator;
