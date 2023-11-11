/**
 * This handler is responsible for handling the player action requests.
 * It takes a raw string (the action title present in userDashboardActionCardData.json) and calls the appropriate API
 * service to handle the request.
 */

export class PlayerActionRequestHandler {
  public static handleRequest(
    actionTitle: string,
    playerInputs: {
      type: string;
      placeholder: string;
      selectedOption: string;
      dropdownList: string[];
      representedData: string;
    }[],
  ): void {}
}
