import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { SongCreated } from "../generated/Tonsura/Tonsura"

export function createSongCreatedEvent(
  songId: BigInt,
  metadata: string,
  songAddress: Address
): SongCreated {
  let songCreatedEvent = changetype<SongCreated>(newMockEvent())

  songCreatedEvent.parameters = new Array()

  songCreatedEvent.parameters.push(
    new ethereum.EventParam("songId", ethereum.Value.fromUnsignedBigInt(songId))
  )
  songCreatedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromString(metadata))
  )
  songCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "songAddress",
      ethereum.Value.fromAddress(songAddress)
    )
  )

  return songCreatedEvent
}
