import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { SongCreated } from "../generated/schema"
import { SongCreated as SongCreatedEvent } from "../generated/Tonsura/Tonsura"
import { handleSongCreated } from "../src/tonsura"
import { createSongCreatedEvent } from "./tonsura-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let songId = BigInt.fromI32(234)
    let metadata = "Example string value"
    let songAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newSongCreatedEvent = createSongCreatedEvent(
      songId,
      metadata,
      songAddress
    )
    handleSongCreated(newSongCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SongCreated created and stored", () => {
    assert.entityCount("SongCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SongCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "songId",
      "234"
    )
    assert.fieldEquals(
      "SongCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadata",
      "Example string value"
    )
    assert.fieldEquals(
      "SongCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "songAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
