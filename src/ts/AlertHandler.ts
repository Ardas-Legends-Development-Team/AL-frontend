import { useAlertStore } from "@/stores/systemStores";

export class AlertHandler {
  public static showAlert(alertMessage: string) {
    useAlertStore().alertMessage = alertMessage;
    useAlertStore().hasAlert = true;
  }

  public static showSuccessAlert(alertMessage: string) {
    useAlertStore().successAlertMessage = alertMessage;
    useAlertStore().hasSuccessAlert = true;
  }
}
