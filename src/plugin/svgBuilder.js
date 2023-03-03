// 此文件暴露为一个vite插件
import { readFileSync, readdirSync } from 'fs';

// readFileSync：node里面的同步读取文件的方法（readFile是异步）
// fs.readdirSync()方法用于同步读取一个指定目录的内容。该方法返回一个包含目录中所有文件名或对象的数组。选项参数可以用来改变从该方法返回的文件的格式。
let idPerfix = '';
const svgTitle = /<svg([^>+].*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;

const hasViewBox = /(viewBox="[^>+].*?")/g;

const clearReturn = /(\r)|(\n)/g;

function findSvgFile(dir) {
  const svgRes = [];
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + '/'));
    } else {
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, '')
        .replace(svgTitle, ($1, $2) => {
          // console.log(++i)
          // console.log(dirent.name)
          let width = 0;
          let height = 0;
          let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
            if (s2 === 'width') {
              width = s3;
            } else if (s2 === 'height') {
              height = s3;
            }
            return '';
          });
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`;
          }
          return `<symbol id="${idPerfix}-${dirent.name.replace('.svg', '')}" ${content}>`;
        })
        .replace('</svg>', '</symbol>');
      svgRes.push(svg);
    }
  }
  return svgRes;
}

export const svgBuilder = (path, perfix = 'icon') => {
  if (path === '') return;
  idPerfix = perfix;
  const res = findSvgFile(path);
  // console.log(res.length)
  // const res = []
  return {
    name: 'svg-transform',
    // vite里的内容：转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文。上下文在开发期间暴露ViteDevServer实例，在构建期间暴露 Rollup 输出的包。
    transformIndexHtml(html) {
      return html.replace(
        '<body>',
        `
          <body>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
              ${res.join('')}
            </svg>
        `
      );
    },
  };
};
