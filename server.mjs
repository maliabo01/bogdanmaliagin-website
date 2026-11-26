import http from 'node:http';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';

const project=path.dirname(fileURLToPath(import.meta.url));
const root=path.join(project,'dist/client');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};

export const server=http.createServer(async (req,res)=>{
  const reply=(status,body='')=>{res.writeHead(status);res.end(body)};
  try {
    const url=new URL(req.url,'http://127.0.0.1:8765');
    if(req.method==='POST' && url.pathname==='/inquiries'){
      if(req.headers.origin!=='http://127.0.0.1:8765' || req.headers['content-type']!=='application/json')return reply(403);
      let body='';
      for await(const chunk of req){body+=chunk;if(body.length>30000)return reply(413)}
      let data;
      try{data=JSON.parse(body)}catch{return reply(400)}
      if(!data||!['name','email','message','type'].every(k=>typeof data[k]==='string'))return reply(400);
      const {name,email,message,type}=data;
      if(!name.trim()||name.length>150||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||!message.trim()||message.length>5000||type.length>100)return reply(400);
      const dir=path.join(project,'inquiries');
      await mkdir(dir,{recursive:true,mode:0o700});
      await writeFile(path.join(dir,randomUUID()+'.json'),JSON.stringify({name,email,message,type,received:new Date().toISOString()},null,2),{mode:0o600,flag:'wx'});
      return reply(201);
    }
    if(!['GET','HEAD'].includes(req.method))return reply(405);
    const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(!file.startsWith(root+path.sep))return reply(404);
    const bytes=await readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
    res.end(req.method==='HEAD'?undefined:bytes);
  }catch{reply(404)}
});
server.listen(8765,'127.0.0.1',()=>console.log('Photography preview: http://127.0.0.1:8765'));
