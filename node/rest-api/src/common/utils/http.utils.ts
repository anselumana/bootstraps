import moment from "moment";

export function formatRes(data: any, error?: string) {
  return {
    data: data,
    status: {
      timestamp: moment().unix(),
      error: error || null,
    }
  }
}