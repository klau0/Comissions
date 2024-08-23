import { Injectable } from '@angular/core';
import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import * as Proof from '@web3-storage/w3up-client/proof'
import { Signer } from '@web3-storage/w3up-client/principal/ed25519'
import { create } from '@web3-storage/w3up-client'
import { environment } from '../../../environments/environment.development';
import { CARMetadata } from '@web3-storage/w3up-client/dist/src/types';

@Injectable({
  providedIn: 'root'
})
export class Web3storageService {
  client: any;

  constructor() {}
  // Agent DID: did:key:z6Mku9MRWjAVZtCL5mnCZW1QuM8t3GBGyALj6gSgg4oVZa7W
  // Agent private key: MgCZd3eotWMQ4QFyIqS2hL5Z3IMQ09dBRXw/+XOjgeXBx5e0B2kjuItA1vbq4Mk0AX49fgdpaNokWQ3vrlUbH6qhK6d0=
  
  async delegateAccessToClientOnStorageSpace(){
    // Load client with specific private key
    const principal = Signer.parse(environment.KEY);
    const store = new StoreMemory();
    const client = await Client.create({ principal, store });
    // Add proof that this agent has been delegated capabilities on the space
    const proof = await Proof.parse(environment.PROOF);
    const space = await client.addSpace(proof);
    await client.setCurrentSpace(space.did());
    this.client = client;
  }

  uploadDirectory(files: File[]){
    return this.client.uploadDirectory(files);
  }

  removeDirectory(cid: Signer.UnknownLink){
    this.client.remove(cid, { shards: true });
  }
  
}
