import { RouterBuilder } from '@paraspell/xcm-router'

const alice = keyring.createFromUri('//Alice');
const bob = keyring.createFromUri('//Bob');

const result = await RouterBuilder
        .from('Polkadot')   //Origin Parachain/Relay chain
        .exchange('HydraDX')    //Exchange Parachain
        .to('Astar')    //Destination Parachain/Relay chain
        .currencyFrom('DOT')    // Currency to send
        .currencyTo('ASTR')    // Currency to receive
        .amount('1000000')  // Amount to send
        .slippagePct('1')   // Max slipppage percentage
        .injectorAddress()   //Injector address
        .recipientAddress(alice.address) //Recipient address
        .signer(alice.signer)    //Signer
        .onStatusChange((status: TTxProgressInfo) => {  //This is how we subscribe to calls that need signing
          console.log(status.hashes);   //Transaction hashes
          console.log(status.status);   //Transaction statuses
          console.log(status.type);    //Transaction types
        })
        .buildAndSend()

