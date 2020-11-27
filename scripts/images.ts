import fs from 'fs';

const imagesPath = 'src/apps/res/images';

const imageFileNames = () => {
  const array = fs
    .readdirSync(imagesPath)
    .filter((file) => {
      return file.endsWith('.png');
    })
    .map((file) => {
      return file
        .replace('@2x.png', '')
        .replace('@3x.png', '')
        .replace('.png', '');
    });

  return Array.from(new Set(array));
};

const generate = () => {
  const properties = imageFileNames()
    .map((name) => {
      return `${name}: require('./${name}.png')`;
    })
    .join(',\r\n  ');

  const string = `const images = {\r\n  ${properties},\r\n};\r\nexport default images;\r\n`;

  fs.writeFileSync(imagesPath + '/index.ts', string, 'utf8');
};

generate();
