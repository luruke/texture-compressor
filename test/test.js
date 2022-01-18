const { pack } = require('../dist/cli/lib/index');

(async function() {
  let imgPath = './test.jpg';
  let imgOut = './out';

  console.log('run');


  // await compress(imgPath, imgOut, 'pvrtc');

    await compress(imgPath, imgOut, 's3tc');
    await compress(imgPath, imgOut, 'etc');
    await compress(imgPath, imgOut, 'pvrtc');
    await compress(imgPath, imgOut, 'astc');
})();

async function compress(imgPath, imgOut, type) {
  const isMipmap = !!imgPath.includes('mipmap');

  let comp, qual, ext;
  switch (type) {
      case "s3tc":
          comp = imgPath.includes('png') ? 'DXT5' : 'DXT1';
          qual = 'uber';
          ext = 'dxt';
          break;
      case "pvrtc":
          comp = 'PVRTC1_4_RGB';
          qual = 'pvrtcnormal';
          ext = 'pvrtc';
          break;
      case "etc":
          comp = 'ETC2_RGB';
          qual = 'etcfast';
          ext = 'etc';
          break;
      case "astc":
          comp = 'ASTC_8X8';
          qual = 'astcmedium';
          ext = 'astc';
          break;
  }

  console.log('compressing', type);

  await pack({
    type,
    input: imgPath,
    output: `${imgOut}-${ext}.ktx`,
    compression: comp,
    quality: qual,
    mipmap: isMipmap
  });
}