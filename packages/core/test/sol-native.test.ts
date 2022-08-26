import { describe, it, before } from 'mocha';
import { SolNative, Account, Multisig, KeypairStr } from '../src';
import { assert } from 'chai';
import { Setup } from '../../shared/test/testSetup';
import { Filter, DirectionFilter } from '../src/types/find';

let source: KeypairStr;
let dest: KeypairStr;
const searchTokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.01;
    const inst = await SolNative.transfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      solAmount
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap());
  });

  it('transfer feePayerPartialSign', async () => {
    const solAmount = 0.01;
    const serialized = await SolNative.feePayerPartialSignTransfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      solAmount,
      source.pubkey.toPublicKey()
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);
    if (serialized.isOk) {
      console.log(serialized.value);
      const res = await serialized.value.submit(source.toKeypair());
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });

  it('transfer transaction with fee payer', async () => {
    const solAmount = 0.01;
    const owner = Account.create();
    await Account.requestAirdrop(owner.toPublicKey());
    const feePayer = source;

    /* tslint:disable-next-line */
    const before = (
      await Account.getBalance(feePayer.pubkey.toPublicKey())
    ).unwrap();

    console.log(before);

    const inst = await SolNative.transfer(
      owner.toPublicKey(),
      dest.toPublicKey(),
      [owner.toKeypair()],
      solAmount,
      feePayer.toKeypair()
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap());
    const after = (
      await Account.getBalance(feePayer.pubkey.toPublicKey())
    ).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });

  it('transfer transaction with multi sig', async () => {
    const signer1 = Account.create();
    const signer2 = Account.create();
    const inst1 = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    let multisig!: string;

    (await inst1.submit()).match(
      (_) => {
        multisig = inst1.unwrap().data as string;
        console.log('# multisig: ', multisig);
      },
      (err) => assert.fail(err.message)
    );

    const inst2 = await SolNative.transferWithMultisig(
      multisig.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair(), signer1.toKeypair(), signer2.toKeypair()],
      0.01,
      source.toKeypair()
    );

    (await inst2.submit()).match(
      (sig) => console.log('# signature: ', sig),
      (err) => assert.fail(err.message)
    );
  });

  it('Get transfer history with set optional filter', async () => {
    const limit = 20;
    const res = await SolNative.findByOwner(searchTokenKey.toPublicKey(), {
      limit,
      actionFilter: [Filter.MintTo],
    });
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap()[0].type, Filter.MintTo);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with transfer destination filter', async () => {
    const destination = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const res = await SolNative.findByOwner(searchTokenKey.toPublicKey(), {
      directionFilter: DirectionFilter.Dest,
    });
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      // console.log(v.info);
      assert.isNotNull(v.date);
      assert.equal(v.info.destination, destination);
    });
  });

  it('Get transfer history with transfer source filter', async () => {
    const source = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const res = await SolNative.findByOwner(searchTokenKey.toPublicKey(), {
      directionFilter: DirectionFilter.Source,
    });

    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.source, source);
    });
  });

  it('Get transfer history by address', async () => {
    const searchAddress =
      'HeH2PRj4GEdLCsbKQ18LvwhbuH4anmPQ3HoeRsJmymVw'.toPublicKey();
    const res = await SolNative.findByOwner(searchAddress);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });
});
