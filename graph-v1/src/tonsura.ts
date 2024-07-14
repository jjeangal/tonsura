import { Bytes, dataSource, DataSourceContext, DataSourceTemplate, log } from "@graphprotocol/graph-ts";
import { SongCreated as SongCreatedEvent } from "../generated/Tonsura/Tonsura"
import { SongCreated, SongContent } from "../generated/schema"

const SONG_ID_KEY = "songId";

export function handleSongCreated(event: SongCreatedEvent): void {
  let entity = new SongCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.songId = event.params.songId
  entity.metadata = event.params.metadata
  entity.songAddress = event.params.songAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let ipfsIndex = entity.metadata.indexOf("/ipfs/");

  if (ipfsIndex == -1) return;

  let context = new DataSourceContext();
  context.setBytes(SONG_ID_KEY, entity.id);

  if (ipfsIndex != -1) {
    let hash = entity.metadata.substr(ipfsIndex + 6);
    log.error("Fetching IPFS content for hash: {}", [hash]);
    DataSourceTemplate.createWithContext("IpfsContent", [hash], context);
  }
}

export function handleSongContent(content: Bytes): void {
  let hash = dataSource.stringParam();
  let context = dataSource.context();
  let id = context.getBytes(SONG_ID_KEY);

  let song = new SongContent(id);

  song.hash = hash;
  song.content = content.toString();

  song.save();
}
