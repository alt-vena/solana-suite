import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { InfraSideOutput, PostTokenAccount, UserSideOutput } from '../types/';
import { convertTimestampToDateTime } from 'shared';

export namespace Convert.Memo {
  export const intoUserSide = (
    output: InfraSideOutput.Memo,
    meta: ParsedTransactionWithMeta,
    outputTransfer?: InfraSideOutput.TransferChecked,
    mappingTokenAccount?: PostTokenAccount[],
  ): UserSideOutput.History | undefined => {
    const history: UserSideOutput.History = {};

    // case: transfer with memo
    if (outputTransfer && outputTransfer.program !== '') {
      if (mappingTokenAccount && outputTransfer.program === 'spl-token') {
        const foundSource = mappingTokenAccount.find(
          (m) => m.account === outputTransfer.parsed.info.source,
        );
        const foundDest = mappingTokenAccount.find(
          (m) => m.account === outputTransfer.parsed.info.destination,
        );

        history.mint = outputTransfer.parsed.info.mint;
        foundSource && (history.source = foundSource.owner);
        foundDest && (history.destination = foundDest.owner);
      } else {
        history.source = outputTransfer.parsed.info.source;
        history.destination = outputTransfer.parsed.info.destination;
      }
    }

    history.memo = output.parsed;
    history.type = output.program;
    history.dateTime = convertTimestampToDateTime(meta.blockTime as number);
    history.sig = meta.transaction.signatures[0];
    history.innerInstruction = false;

    if (
      meta.meta?.innerInstructions &&
      meta.meta?.innerInstructions.length !== 0
    ) {
      // inner instructions
      history.innerInstruction = true;
    }
    return history;
  };
}