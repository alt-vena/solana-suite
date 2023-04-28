import { Convert as C1 } from './creators';
import { InfraSideInput, UserSideInput } from '../types';

export namespace Convert.TokenMetadata {
  export const intoInfraSide = (
    input: UserSideInput.TokenMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): InfraSideInput.MetaplexDataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: C1.Creators.intoInfraSide(input.creators),
      collection: null,
      uses: input.uses || null,
    };
  };
}
