import { SongCreated as SongCreatedEvent } from "../generated/Tonsura/Tonsura"
import { SongCreated } from "../generated/schema"

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
}
