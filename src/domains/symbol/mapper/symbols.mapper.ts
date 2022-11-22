import { GetSymbol } from "../models/symbol.dto.models";
import { Symbol } from "../models/symbol.model";


export default class SymbolsMapper {
  public static toGetDto(s: Symbol): GetSymbol {
    const { userId, ...rest } = s;
    return rest;
  }
}