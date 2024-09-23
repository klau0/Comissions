import { Injectable } from '@angular/core';
import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import * as Proof from '@web3-storage/w3up-client/proof'
import { Signer } from '@web3-storage/w3up-client/principal/ed25519'
import { environment } from '../../../environments/environment.development';
import { AnyLink } from '@web3-storage/w3up-client/dist/src/types';
import { toJSON, fromJSON } from 'multiformats/cid';

@Injectable({
  providedIn: 'root'
})
export class Web3storageService {
  client: any;

  constructor() {}

  async delegateAccessToClientOnStorageSpace() {
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

  uploadDirectory(files: File[]) {
    return this.client.uploadDirectory(files);
  }

  uploadFile(file: File) {
    return this.client.uploadFile(file);
  }

  removeCID(cid: Signer.UnknownLink) {
    this.client.remove(cid, { shards: true });
  }
  
  serializeCID(cid: AnyLink) {
    let cidJson = toJSON(cid);
    return JSON.stringify(cidJson);
  }

  parseCID(cidString: string) {
    let cidParsed = JSON.parse(cidString);
    return fromJSON(cidParsed);
  }
  
}
