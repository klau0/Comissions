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

  constructor() {
    this.delegateAccessToClientOnStorageSpace();
  }

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

  async uploadFiles(files: File[]): Promise<string[]> {
    let serializedFiles: string[] = [];
    for (const file of files) {
      const fileCid = await this.client.uploadFile(file);
      serializedFiles.push(this.serializeCID(fileCid));
    }
    return serializedFiles;
  }

  async uploadFile(file: File): Promise<string> {
    const fileCid = await this.client.uploadFile(file);
    return this.serializeCID(fileCid);
  }

  removeCID(serializedCid: string) {
    const parsedCid = this.parseCID(serializedCid);
    this.client.remove(parsedCid, { shards: true });
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
