import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from './types';

export namespace Creators {
  export const toConvertInfra = (
    input: UserSideInput.Creator[] | undefined
  ): InfraSideInput.Creator[] | null => {
    if (!input) {
      return null;
    }
    return input.map((data) => {
      const modify = {
        address: data.address.toPublicKey(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };

  export const toConvertUser = (
    output: InfraSideOutput.Creator[]
  ): UserSideOutput.Creator[] => {
    if (!output) {
      return [];
    }
    return output.map((data) => {
      const modify: UserSideOutput.Creator = {
        address: data.address.toString(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };
}
