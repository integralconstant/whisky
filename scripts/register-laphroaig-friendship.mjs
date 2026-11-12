import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaigFriendshipWhiskies as candidates} from '../src/data/whiskies-laphroaig-friendship.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-friendship.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file),urls=await read('.cache/laphroaig-friendship-urls.json');
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));names.add(norm(item.name));names.add(norm(item.englishName));photos[item.id]={imageUrl:urls[item.age===12?1:2],sourceUrl:item.source,productName:item.englishName,note:item.age===12?'공식 실물 라벨 Friendship#1·803978·312병·58.2%·700ml 확인.':'공식 실물 라벨 Friendship#2·캐스크5·192병·50.8%·700ml 확인.'};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-friendship-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:[...candidates.map(x=>x.source),'https://laphroaig.runfair.com/en-US/gb/friendship-cask-1','https://www.laphroaig.com/en-gb/whiskies/friendship-cask-2'],photoReview:Object.fromEntries(candidates.map(x=>[x.id,photos[x.id].note])),notesProvenance:'Each producer page paraphrased separately. Ages12 and18 explicit, no CS inferred from ABV/single-cask status.',duplicateCheck:'IDs and normalized Korean/English names checked against543 entries and within cohort.',remaining:'CS classification pending. #1 producer states2013-06-13, auction listings call2014; omit exact vintage rather than invent a separate variant. #3 still announced without complete specs.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
