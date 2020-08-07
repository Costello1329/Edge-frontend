import {Validator} from "../validation/validator";
import {ruleIsGuid} from "../validation/commonValidators";



export class Guid {
  readonly str: string;

  constructor (guid: string) {
    const validated: boolean =
      (new Validator([ruleIsGuid])).validate(guid).length === 0;

    if (validated)
      this.str = guid;

    else
      throw Error("Guid validation failed");
  }
}


export const getRandomGuid = (): Guid => {
  const replacer = (chart: string): string => { 
    const randomValue = Math.random() * 16 | 0;
    return (chart === "x" ? randomValue : (randomValue & 0x3 | 0x8)).toString(16); 
  };

  const guid: string =
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, replacer);

  return new Guid(guid);
}
