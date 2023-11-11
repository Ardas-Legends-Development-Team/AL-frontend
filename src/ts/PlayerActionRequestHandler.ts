import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { ErrorHandler } from "@/ts/ErrorHandler";

/**
 * This handler is responsible for handling the player action requests.
 * It takes a raw string (the action title present in userDashboardActionCardData.json) and calls the appropriate API
 * service to handle the request.
 */
export class PlayerActionRequestHandler {
  private static readonly executorDiscordId =
    PlayerApiClient.loadPlayerInfo().discordId;
  public static handleRequest(
    actionTitle: string,
    playerInputs: {
      type: string;
      placeholder: string;
      selectedOption: string;
      dropdownList: string[];
      representedData: string;
    }[],
  ): void {
    actionTitle = actionTitle.toLowerCase();
    // Build the API parameters from playerInputs and then add executorDiscordId
    const requestParameters = {};
    playerInputs.forEach((input) => {
      requestParameters[input.representedData] = input.selectedOption;
    });
    requestParameters["executorDiscordId"] = this.executorDiscordId;
    // If the action title does not contain "leader", the targetDiscordId is the executorDiscordId,
    // else we need to find the targetDiscordId
    if (!actionTitle.includes("leader")) {
      requestParameters["targetDiscordId"] = this.executorDiscordId;
    } else {
      //TODO: Find the targetDiscordId
      const targetDiscordId = "TODO";
      requestParameters["targetDiscordId"] = targetDiscordId;
    }
    console.log("Sent request parameters: ", requestParameters);
    // Call the appropriate API service
    switch (actionTitle) {
      case "leader move":
        break;
      case "leader bind":
        break;
      case "leader unbind":
        break;
      case "move":
        break;
      case "bind":
        break;
      case "unbind":
        break;
      default:
        ErrorHandler.throwError("Action was not found.");
        break;
    }
  }
}
