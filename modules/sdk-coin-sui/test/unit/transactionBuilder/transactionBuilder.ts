import { getBuilderFactory } from '../getBuilderFactory';
import * as testData from '../../resources/sui';
import should from 'should';
import { TransactionType } from '@bitgo/sdk-core';
import { SUI_GAS_PRICE } from '../../../src/lib/transactionBuilder';

describe('Sui Transaction Builder', async () => {
  let builders;
  const factory = getBuilderFactory('tsui');

  beforeEach(function (done) {
    builders = [factory.getTransferBuilder()];
    done();
  });

  it('should start and build an empty transfer tx', async function () {
    const txBuilder = factory.getTransferBuilder();
    txBuilder.sender(testData.sender.address);
    txBuilder.payTx(testData.payTx);
    txBuilder.gasBudget(testData.GAS_BUDGET);
    txBuilder.gasPayment(testData.gasPayment);
    const tx = await txBuilder.build();
    should.equal(tx.type, TransactionType.Send);

    const rawTx = tx.toBroadcastFormat();
    should.equal(rawTx, testData.TRANSFER_TX);
    const reserialized = await factory.from(rawTx).build();
    reserialized.should.be.deepEqual(tx);
    reserialized.toBroadcastFormat().should.equal(rawTx);
  });

  it('should fail to build if missing sender', async function () {
    for (const txBuilder of builders) {
      txBuilder.payTx({
        coins: testData.coins,
        recipients: [testData.recipients[0]],
        amounts: [testData.AMOUNT],
      });
      txBuilder.gasBudget(testData.GAS_BUDGET);
      txBuilder.gasPayment(testData.gasPayment);
      await txBuilder.build().should.rejectedWith('sender is required before building');
    }
  });

  it('should fail to build if missing payTx', async function () {
    for (const txBuilder of builders) {
      txBuilder.sender(testData.sender.address);
      txBuilder.gasBudget(testData.GAS_BUDGET);
      txBuilder.gasPayment(testData.gasPayment);
      await txBuilder.build().should.rejectedWith('payTx is required before building');
    }
  });

  it('should fail to build if missing gasBudget', async function () {
    for (const txBuilder of builders) {
      txBuilder.sender(testData.sender.address);
      txBuilder.payTx({
        coins: testData.coins,
        recipients: [testData.recipients[0]],
        amounts: [testData.AMOUNT],
      });
      txBuilder.gasPayment(testData.gasPayment);
      await txBuilder.build().should.rejectedWith('gasBudget is required before building');
    }
  });

  it('should fail to build if missing gasPayment', async function () {
    for (const txBuilder of builders) {
      txBuilder.sender(testData.sender.address);
      txBuilder.payTx({
        coins: testData.coins,
        recipients: [testData.recipients[0]],
        amounts: [testData.AMOUNT],
      });
      txBuilder.gasBudget(testData.GAS_BUDGET);
      await txBuilder.build().should.rejectedWith('gasPayment is required before building');
    }
  });

  it('should build a send from rawTx', async function () {
    const txBuilder = factory.from(testData.TRANSFER_TX);
    const builtTx = await txBuilder.build();
    should.equal(builtTx.type, TransactionType.Send);
    should.equal(builtTx.id, 'UNAVAILABLE');
    builtTx.inputs.length.should.equal(1);
    builtTx.inputs[0].should.deepEqual({
      address: testData.sender.address,
      value: testData.AMOUNT.toString(),
      coin: 'tsui',
    });
    builtTx.outputs.length.should.equal(1);
    builtTx.outputs[0].should.deepEqual({
      address: testData.recipients[0],
      value: testData.AMOUNT.toString(),
      coin: 'tsui',
    });
    const jsonTx = builtTx.toJson();
    jsonTx.gasBudget.should.equal(testData.GAS_BUDGET);
    jsonTx.gasPrice.should.equal(SUI_GAS_PRICE);
    jsonTx.payTx.should.deepEqual({
      coins: testData.coins,
      recipients: [testData.recipients[0]],
      amounts: [testData.AMOUNT],
    });
    jsonTx.sender.should.equal(testData.sender.address);
    jsonTx.gasPayment.should.deepEqual(testData.gasPayment);
    builtTx.toBroadcastFormat().should.equal(testData.TRANSFER_TX);
  });

  describe('sender tests', async () => {
    it('should succeed for valid sender', function () {
      for (const txBuilder of builders) {
        should.doesNotThrow(() => txBuilder.sender(testData.sender.address));
      }
    });

    it('should throw for invalid sender', function () {
      const invalidSender = 'randomeString';
      for (const txBuilder of builders) {
        should(() => txBuilder.sender(invalidSender)).throw('Invalid or missing sender, got: ' + invalidSender);
      }
    });
  });

  describe('gasBudget tests', async () => {
    it('should succeed for valid gasBudget', function () {
      for (const txBuilder of builders) {
        should.doesNotThrow(() => txBuilder.gasBudget(testData.GAS_BUDGET));
      }
    });

    it('should throw for invalid gasBudget', function () {
      const invalidGasBudget = 0;
      for (const txBuilder of builders) {
        should(() => txBuilder.gasBudget(invalidGasBudget)).throw('Invalid gas budget ' + invalidGasBudget);
      }
    });
  });

  describe('gasPrice tests', async () => {
    it('should succeed for valid gasPrice', function () {
      for (const txBuilder of builders) {
        should.doesNotThrow(() => txBuilder.gasPrice(SUI_GAS_PRICE));
      }
    });

    it('should throw for invalid gasPrice', function () {
      const invalidGasPrice = 2;
      for (const txBuilder of builders) {
        should(() => txBuilder.gasPrice(invalidGasPrice)).throw('Invalid gas price ' + invalidGasPrice);
      }
    });
  });

  describe('payTx tests', async () => {
    it('should succeed for valid payTx', function () {
      for (const txBuilder of builders) {
        should.doesNotThrow(() => txBuilder.payTx(testData.payTx));
      }
    });

    it('should throw for invalid payTx', function () {
      for (const txBuilder of builders) {
        should(() => txBuilder.payTx({})).throw('Invalid payTx, missing coins');
        should(() =>
          txBuilder.payTx({
            recipients: testData.recipients,
            amounts: [testData.AMOUNT],
          })
        ).throw('Invalid payTx, missing coins');
        should(() =>
          txBuilder.payTx({
            coins: testData.coins,
            amounts: [testData.AMOUNT],
          })
        ).throw('Invalid payTx, missing recipients');
        should(() =>
          txBuilder.payTx({
            coins: testData.coins,
            recipients: testData.recipients,
          })
        ).throw('Invalid payTx, missing amounts');
        should(() =>
          txBuilder.payTx({
            coins: testData.coins,
            recipients: [testData.recipients[0], testData.recipients[0]],
            amounts: [testData.AMOUNT],
          })
        ).throw('recipients length 2 must equal to amounts length 1');
        should(() =>
          txBuilder.payTx({
            coins: testData.coins,
            recipients: testData.recipients,
            amounts: [0],
          })
        ).throw('Invalid or missing amounts, got: 0');
      }
    });
  });

  describe('gasPayment tests', async () => {
    it('should succeed for valid gasPayment', function () {
      for (const txBuilder of builders) {
        should.doesNotThrow(() => txBuilder.gasPayment(testData.gasPayment));
      }
    });

    it('should throw for invalid gasPayment', function () {
      for (const txBuilder of builders) {
        should(() => txBuilder.gasPayment({})).throw('Invalid gasPayment, missing objectId');
        should(() =>
          txBuilder.gasPayment({
            version: 1,
            digest: '',
          })
        ).throw('Invalid gasPayment, missing objectId');
        should(() =>
          txBuilder.gasPayment({
            objectId: '',
            digest: '',
          })
        ).throw('Invalid gasPayment, invalid or missing version');
        should(() =>
          txBuilder.gasPayment({
            objectId: '',
            version: 1,
          })
        ).throw('Invalid gasPayment, missing digest');
      }
    });
  });

  it('validateAddress', function () {
    const invalidAddress = { address: 'randomString' };
    for (const builder of builders) {
      should.doesNotThrow(() => builder.validateAddress(testData.sender));
      should(() => builder.validateAddress(invalidAddress)).throwError('Invalid address ' + invalidAddress.address);
    }
  });
});