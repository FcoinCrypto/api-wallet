import 'should';
import * as nock from 'nock';

import { BlockstreamApi } from '../../../../../../src/v2/coins/utxo/recovery/blockstreamApi';

nock.disableNetConnect();

describe('Blockstream API:', function () {
  before(function () {
    const accountInfoResponse = {
      address: '2NBWFbV93FQE52yEV6C7QYQ6DKTbiMoDKuT',
      chain_stats: {
        funded_txo_count: 2,
        funded_txo_sum: 2000000,
        spent_txo_count: 1,
        spent_txo_sum: 1000000,
        tx_count: 3,
      },
      mempool_stats: {
        funded_txo_count: 0,
        funded_txo_sum: 0,
        spent_txo_count: 0,
        spent_txo_sum: 0,
        tx_count: 0,
      },
    };

    const accountUnspentsResponse = [
      {
        txid: '5353100563d6a07d7d7085281222ced09cfb4dfd6e327da3168eac9de6b541fa',
        vout: 0,
        status: {
          confirmed: true,
          block_height: 1483577,
          block_hash: '00000000000000b992bfa11e06204c34065ea1e666b447646f2b546ac3d1e79a',
          block_time: 1551823417,
        },
        value: 1000000,
      },
    ];

    const invalidBitcoinAddressResponse = 'Invalid Bitcoin address';

    nock('https://blockstream.info/testnet/api')
      .get('/address/2NBWFbV93FQE52yEV6C7QYQ6DKTbiMoDKuT')
      .reply(200, accountInfoResponse)
      .get('/address/2NBWFbV93FQE52yEV6C7QYQ6DKTbiMoDKuT/utxo')
      .reply(200, accountUnspentsResponse)
      .get('/address/invalidAddress')
      .reply(400, invalidBitcoinAddressResponse)
      .get('/address/invalidAddress/utxo')
      .reply(400, invalidBitcoinAddressResponse);
  });

  after(function () {
    nock.cleanAll();
  });

  describe('should succeed', function () {
    it('to get an account information', async () => {
      const api = BlockstreamApi.forCoin('tbtc');
      const response = await api.getAccountInfo('2NBWFbV93FQE52yEV6C7QYQ6DKTbiMoDKuT');
      response.txCount.should.equal(3);
      response.totalBalance.should.equal(1000000);
    });

    it('to get an account unspents', async () => {
      const api = BlockstreamApi.forCoin('tbtc');
      const response = await api.getUnspents('2NBWFbV93FQE52yEV6C7QYQ6DKTbiMoDKuT');
      response.length.should.equal(1);
      response[0].id.should.equal('5353100563d6a07d7d7085281222ced09cfb4dfd6e327da3168eac9de6b541fa:0');
      response[0].address.should.equal('2NBWFbV93FQE52yEV6C7QYQ6DKTbiMoDKuT');
      response[0].value.should.equal(1000000);
    });
  });

  describe('should fail', function () {
    it('to get an account information for an invalid address', async () => {
      const api = BlockstreamApi.forCoin('tbtc');
      await api.getAccountInfo('invalidAddress')
        .should.be.rejectedWith(/Error: Bad Request/);
    });

    it('to get an account unspents for an invalid address', async () => {
      const api = BlockstreamApi.forCoin('tbtc');
      await api.getUnspents('invalidAddress')
        .should.be.rejectedWith(/Error: Bad Request/);
    });
  });
});
