'use client'

import { useState } from 'react'
import { PasskeyArgType } from '@safe-global/protocol-kit'

import LoginWithPasskey from './components/LoginWithPasskey'
import SafeAccountDetails from './components/SafeAccountDetails'

import { createPasskey, storePasskeyInLocalStorage } from './lib/passkeys'

function Create4337SafeAccount() {
  const [selectedPasskey, setSelectedPasskey] = useState<PasskeyArgType>()

  async function handleCreatePasskey() {
    const passkey = await createPasskey()

    storePasskeyInLocalStorage(passkey)
    setSelectedPasskey(passkey)
  }

  async function handleSelectPasskey(passkey: PasskeyArgType) {
    setSelectedPasskey(passkey)
  }

  return (
    <div>
      {selectedPasskey ? (
        <SafeAccountDetails passkey={selectedPasskey} />
      ) : (
        <LoginWithPasskey
          handleCreatePasskey={handleCreatePasskey}
          handleSelectPasskey={handleSelectPasskey}
        />
      )}
    </div>
  )
}

export default Create4337SafeAccount
