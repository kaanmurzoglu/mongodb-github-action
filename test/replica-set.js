'use strict'

const Lab = require('@hapi/lab')
const Mongoose = require('mongoose')
const { expect } = require('@hapi/code')

const { describe, it, before } = (exports.lab = Lab.script())

const replicaSetName = 'mongodb-test-rs'

describe('MongoDB Replica Set ->', () => {
  before(async () => {
    await Mongoose.connect('mongodb://mongodb:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      replicaSet: replicaSetName,
      serverSelectionTimeoutMS: 1500
    })
  })

  it('connects to a replica set', async () => {
    const db = Mongoose.connection.db.admin()
    const { ok, set } = await db.command({ replSetGetStatus: 1 })

    expect(ok).to.equal(1)
    expect(set).to.equal(replicaSetName)
  })
})
