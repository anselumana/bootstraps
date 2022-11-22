import { GetExchange } from "../models/exchange.dto.models";
import { Exchange } from "../models/exchange.model";


export default class ExchangesMapper {
  public static toGetDto(s: Exchange): GetExchange {
    const { userId, ...rest } = s;
    return rest;
  }
}