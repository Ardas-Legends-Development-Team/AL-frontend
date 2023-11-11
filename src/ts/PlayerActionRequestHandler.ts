import { ErrorHandler } from "@/ts/ErrorHandler";
import { PlayerActionInput } from "@/ts/types/PlayerActionInput";
import {
  getDiscordIdFromCharacterName,
  getPlayerBoundToArmy,
} from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";
import { AlertHandler } from "@/ts/AlertHandler";

/**
 * This handler is responsible for handling the player action requests.
 * It takes a raw string (the action title present in userDashboardActionCardData.json) and calls the appropriate API
 * service to handle the request.
 */
export class PlayerActionRequestHandler {
  private static readonly executorDiscordId = usePlayerStore().discordId;
  public static handleRequest(
    actionTitle: string,
    playerInputs: PlayerActionInput[],
  ): void {
    actionTitle = actionTitle.toLowerCase();
    // Build the API parameters from playerInputs and then add executorDiscordId
    const requestParameters: any = {};
    playerInputs.forEach((input) => {
      requestParameters[input.representedData] = input.selectedOption;
    });
    requestParameters["executorDiscordId"] = this.executorDiscordId;
    // If the action title does not contain "leader", the targetDiscordId is the executorDiscordId,
    // else we need to find the targetDiscordId
    if (!actionTitle.includes("leader")) {
      requestParameters["targetDiscordId"] = this.executorDiscordId;
    } else {
      requestParameters["targetDiscordId"] =
        this.getTargetDiscordId(playerInputs);
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
        // TODO: we don't pass the army as input parameter so we need fetch it
        break;
      default:
        ErrorHandler.throwError("Action was not found.");
        break;
    }
    // Show a success message
    AlertHandler.showSuccessAlert("Action submitted successfully.");
  }

  private static getTargetDiscordId(playerInputs: PlayerActionInput[]): string {
    // Iterate through the playerInputs to find, calling the appropriate utility method to extract the targetDiscordId
    // from either a character name or an army name
    for (const input of playerInputs) {
      if (input.representedData === "targetCharaterName") {
        return getDiscordIdFromCharacterName(input.selectedOption);
      } else if (
        input.representedData === "armyName" &&
        input.selectedOption !== ""
      ) {
        return getPlayerBoundToArmy(input.selectedOption);
      }
    }
    return "Error";
  }
}
