import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Validator } from '~/validator';

describe('Validator', () => {
  it('[Success]isRoyalty', async () => {
    const res = Validator.isRoyalty(30);
    assert.isOk(res.isOk);
  });

  it('[Success]isRoyalty: zero number', async () => {
    const res = Validator.isRoyalty(0);
    assert.isTrue(res.isOk);
  });

  it('[Error]isRoyalty: too small number', async () => {
    const res = Validator.isRoyalty(-1);
    if (res.isErr) {
      assert.include(res.error.message, Validator.Message.SMALL_NUMBER);
      assert.isArray(res.error.details);
    }
  });

  it('[Error]isRoyalty: too big number', async () => {
    const res = Validator.isRoyalty(200);
    assert.include(
      res.isErr && res.error.message,
      Validator.Message.BIG_NUMBER
    );
  });

  it('[Error]isRoyalty: empty value', async () => {
    const res = Validator.isSellerFeeBasisPoints(parseInt(''));
    assert.include(res.isErr && res.error.message, Validator.Message.EMPTY);
  });

  it('[Success]isSellerFeeBasisPoints', async () => {
    const res = Validator.isSellerFeeBasisPoints(3000);
    assert.isOk(res.isOk);
  });

  it('[Success]isSellerFeeBasisPoints: zero number', async () => {
    const res = Validator.isSellerFeeBasisPoints(0);
    assert.isTrue(res.isOk);
  });

  it('[Error]isSellerFeeBasisPoints: too small number', async () => {
    const res = Validator.isSellerFeeBasisPoints(-1);
    if (res.isErr) {
      assert.include(res.error.message, Validator.Message.SMALL_NUMBER);
      assert.isArray(res.error.details);
    }
  });

  it('[Error]isSellerFeeBasisPoints: too big number', async () => {
    const res = Validator.isSellerFeeBasisPoints(20000);
    assert.include(
      res.isErr && res.error.message,
      Validator.Message.BIG_NUMBER
    );
  });

  it('[Error]isSellerFeeBasisPoints: empty value', async () => {
    const res = Validator.isSellerFeeBasisPoints(parseInt(''));
    assert.include(res.isErr && res.error.message, Validator.Message.EMPTY);
  });

  it('[Success]isName', async () => {
    const res = Validator.isName('name');
    assert.isOk(res.isOk);
  });

  it('[Error]isName: too long length', async () => {
    const res = Validator.isName(
      'long-long-name-long-long-name-long-long-name'
    );
    assert.include(
      res.isErr && res.error.message,
      Validator.Message.LONG_LENGTH
    );
  });

  it('[Error]isName: empty value', async () => {
    const res = Validator.isName('');
    assert.include(res.isErr && res.error.message, Validator.Message.EMPTY);
  });

  it('[Success]isSymbol', async () => {
    const res = Validator.isSymbol('SYMBOL');
    assert.isOk(res.isOk);
  });

  it('[Error]isSymbol: too long length', async () => {
    const res = Validator.isSymbol('LONG-LONG-SYMBOL');
    assert.include(
      res.isErr && res.error.message,
      Validator.Message.LONG_LENGTH
    );
  });

  it('[Error]isSymbol: empty value', async () => {
    const res = Validator.isName('');
    assert.include(res.isErr && res.error.message, Validator.Message.EMPTY);
  });

  it('[Success]isImageUrl', async () => {
    const res = Validator.isImageUrl(
      'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50'
    );
    assert.isOk(res.isOk);
  });

  it('[Error]isImageUrl: empty value', async () => {
    const res = Validator.isImageUrl('');
    assert.include(res.isErr && res.error.message, Validator.Message.EMPTY);
  });

  it('[Error]isImageUrl: invalid value', async () => {
    const res = Validator.isImageUrl('invalid url');
    assert.include(
      res.isErr && res.error.message,
      Validator.Message.INVALID_URL
    );
  });

  it('[Error]isImageUrl: too long length', async () => {
    const res = Validator.isImageUrl(`https://example.com/${'x'.repeat(200)}`);
    assert.include(
      res.isErr && res.error.message,
      Validator.Message.LONG_LENGTH
    );
  });

  it('[Success]checkAll', async () => {
    const data = {
      name: 'name',
      seller_fee_basis_points: 50,
      royalty: 0,
      symbol: 'SYMBOL',
      image: 'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
    };
    const res = Validator.checkAll(data);
    console.log(res);
    assert.isTrue(res.isOk);
  });

  it('[Error]checkAll', async () => {
    const data = {
      name: '',
      uri: '',
      seller_fee_basis_points: 15000,
      symbol: 'LONG-SYMBOL-LONG-SYMBOL',
      image: `https://example.com/${'x'.repeat(200)}`,
      filePath: '',
      sellerFeeBasisPoints: -10,
    };
    const res = Validator.checkAll(data);
    res.match(
      (_) => assert.fail('Unexpected Error'),
      (err) => console.log(err.details)
    );
  });
});