import { Result } from '@solana-suite/shared';
import { NftStorageMetadata } from '../storage';

export namespace Validator {
  export namespace Message {
    export const SUCCESS = 'success';
    export const SMALL_NUMBER = 'too small';
    export const BIG_NUMBER = 'too big';
    export const LONG_LENGTH = 'too long';
    export const EMPTY = 'invalid empty value';
    export const INVALID_URL = 'invalid url';
  }

  export const NAME_LENGTH = 32;
  export const SYMBOL_LENGTH = 10;
  export const URL_LENGTH = 200;
  export const ROYALTY_MAX = 100;
  export const ROYALTY_MIN = 0;

  export type Condition = 'overMax' | 'underMin';
  export interface Limit {
    threshold: number;
    condition: Condition;
  }

  export interface Details {
    key: string;
    message: string;
    actual: string | number;
    limit?: Limit;
  }

  export const isRoyalty = (
    royalty: number
  ): Result<string, ValidatorError> => {
    const key = 'royalty';
    if (!royalty) {
      return Result.err(createError(key, Message.EMPTY, royalty));
    }
    if (royalty < ROYALTY_MIN) {
      return Result.err(
        createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: ROYALTY_MIN,
          condition: 'underMin',
        })
      );
    } else if (royalty > ROYALTY_MAX) {
      return Result.err(
        createError(key, Message.BIG_NUMBER, royalty, {
          threshold: ROYALTY_MAX,
          condition: 'overMax',
        })
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isName = (name: string): Result<string, ValidatorError> => {
    const key = 'name';
    if (!name) {
      return Result.err(createError(key, Message.EMPTY, name));
    }
    if (byteLength(name) > NAME_LENGTH) {
      return Result.err(
        createError(key, Message.LONG_LENGTH, name, {
          threshold: NAME_LENGTH,
          condition: 'overMax',
        })
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isSymbol = (symbol: string): Result<string, ValidatorError> => {
    const key = 'symbol';
    if (!symbol) {
      return Result.err(createError(key, Message.EMPTY, symbol));
    }
    if (byteLength(symbol) > SYMBOL_LENGTH) {
      return Result.err(
        createError(key, Message.LONG_LENGTH, symbol, {
          threshold: SYMBOL_LENGTH,
          condition: 'overMax',
        })
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isImageUrl = (
    imageUrl: string
  ): Result<string, ValidatorError> => {
    const key = 'image';
    if (!imageUrl) {
      return Result.err(createError(key, Message.EMPTY, imageUrl));
    }
    if (byteLength(imageUrl) > URL_LENGTH) {
      return Result.err(
        createError(key, Message.LONG_LENGTH, imageUrl, {
          threshold: URL_LENGTH,
          condition: 'overMax',
        })
      );
    }
    if (!/https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(imageUrl)) {
      return Result.err(createError(key, Message.INVALID_URL, imageUrl));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const checkAll = (
    metadata: NftStorageMetadata
  ): Result<string, ValidatorError> => {
    const keys = Object.keys(metadata);
    const results: Details[] = [];
    keys.map((key) => {
      let res!: Result<string, ValidatorError>;
      switch (key) {
        case 'name':
          res = isName(metadata.name!);
          break;
        case 'seller_fee_basis_points':
          res = isRoyalty(metadata.seller_fee_basis_points!);
          break;
        case 'symbol':
          res = isSymbol(metadata.symbol!);
          break;
        case 'image':
          res = isImageUrl(metadata.image!);
          break;
      }
      if (res && res.isErr) {
        results.push(...res.error.details);
      }
    });
    if (results.length > 0) {
      const message = 'Caught in the validation errors';
      return Result.err(new ValidatorError(message, results));
    }
    return Result.ok(Message.SUCCESS);
  };

  const byteLength = (value: string): number => {
    const text = new TextEncoder();
    return text.encode(value).length;
  };

  const createError = (
    key: string,
    message: string,
    actual: string | number,
    limit?: Limit
  ): ValidatorError => {
    let error: ValidatorError;
    if (limit) {
      error = new ValidatorError(message, [{ key, message, actual, limit }]);
    } else {
      error = new ValidatorError(message, [{ key, message, actual }]);
    }
    return error;
  };
}

export class ValidatorError extends Error {
  details: Validator.Details[];
  constructor(message: string, details: Validator.Details[]) {
    super(message);
    this.details = details;
  }
}
