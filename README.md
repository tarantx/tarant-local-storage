# ![logomakr_8pe69n](https://user-images.githubusercontent.com/3071208/50903610-8ab1e700-141e-11e9-8190-81a2a8ffe4fe.png)

[![npm](https://img.shields.io/npm/v/tarant-local-storage.svg)](https://www.npmjs.com/package/tarant-local-storage)
[![Build Status](https://travis-ci.org/tarantx/tarant-local-storage.svg?branch=master)](https://travis-ci.org/tarantx/tarant-local-storage)
[![Coverage Status](https://coveralls.io/repos/github/tarantx/tarant-local-storage/badge.svg?branch=master)](https://coveralls.io/github/tarantx/tarant-local-storage?branch=master)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![issues Welcome](https://img.shields.io/badge/issues-welcome-brightgreen.svg)
![npm](https://img.shields.io/npm/l/tarant-local-storage.svg)
![GitHub issues](https://img.shields.io/github/issues/tarantx/tarant-local-storage.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tarantx/tarant-local-storage.svg)
![Downloads](https://img.shields.io/npm/dt/tarant-local-storage.svg)

## Motivation

Usually complex applications need to store offline part of the state, so it can be synced back or reused later. This
module lets tarant store your actors serialized in the local storage and recovered implicitly.

## Installation

Add it to your project using `npm install tarant-local-storage --save` or `yarn add tarant-local-storage`

## Usage

You need to mark which classes need to be exported first. Usually this is done with the `LocalStoragePersisted`  
class decorator.

```js
import { Actor } from "tarant";
import { LocalStoragePersisted } from "tarant-local-storage";

export default class MyPersistedActor extends Actor {
    ...
}
LocalStoragePersisted("MyPersistedActor", MyPersistedActor) // NameOfThePersistedClass (unique), Class constructor
```

And then add the repository as a materializer and as a resolver:

```js
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import MyPersistedActor from './actor';
import { LocalStoragePersisted, LocalStorageRepository } from 'tarant-local-storage';

window.onload = () => {
  const repository = new LocalStorageRepository()

  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
  .withMaterializers([repository])
  .withResolvers([repository])
  .done())  

  system.actorOf(MyPersistedActor)
}
```
##### Created my free [logo](https://logomakr.com/8pe69n) at <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> 