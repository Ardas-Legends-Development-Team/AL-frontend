import { useErrorStore } from "@/stores/systemStores";

export class ErrorHandler {
  public static throwError(errorMessage: string) {
    useErrorStore().errorMessage = errorMessage;
    useErrorStore().hasError = true;
    console.log("HasError: " + useErrorStore().hasError);
  }
}
