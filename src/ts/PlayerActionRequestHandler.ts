import { ErrorHandler } from "@/ts/ErrorHandler";
import { PlayerActionInput } from "@/ts/types/PlayerActionInput";
import {
  getDiscordIdFromCharacterName,
  getPlayerBoundToArmy,
} from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";
import { AlertHandler } from "@/ts/AlertHandler";
import { MovementApiClient } from "@/ts/ApiService/MovementApiClient";
import { ArmyControlApiClient } from "@/ts/ApiService/ArmyControlApiClient";
import { PlayerApiClient } from "@/ts/ApiService/PlayerApiClient";
import { CharacterInfo } from "@/ts/types/CharacterInfo";

/**
 * This handler is responsible for handling the player action requests.
 * It takes a raw string (the action title present in userDashboardActionCardData.json) and calls the appropriate API
 * service to handle the request.
 */
export class PlayerActionRequestHandler {
  private static readonly executorDiscordId = usePlayerStore().discordId;
  public static async handleRequest(
    actionTitle: string,
    playerInputs: PlayerActionInput[],
  ): Promise<void> {
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
      // Check if the action is a bind action, then pass a corresponding boolean to getTargetDiscordId
      const isBind = actionTitle.includes("bind");
      requestParameters["targetDiscordId"] = await this.getTargetDiscordId(
        playerInputs,
        isBind,
      );
    }
    const characterInfo: CharacterInfo =
      await PlayerApiClient.loadCharacterInfo(usePlayerStore().discordId);
    console.log("Sent request parameters: ", requestParameters);
    // Call the appropriate API service
    switch (actionTitle) {
      case "leader move":
        await MovementApiClient.moveArmyOrCompany(
          requestParameters["toRegion"],
          requestParameters["armyName"],
        );
        break;
      case "leader bind":
        await ArmyControlApiClient.bindArmy(
          requestParameters["targetDiscordId"],
          requestParameters["armyName"],
        );
        break;
      case "leader unbind":
        await ArmyControlApiClient.unbindArmy(
          requestParameters["targetDiscordId"],
          requestParameters["armyName"],
        );
        break;
      case "leader station":
        await ArmyControlApiClient.stationArmy(
          requestParameters["claimbuildName"],
          requestParameters["armyName"],
        );
        break;
      case "leader unstation":
        await ArmyControlApiClient.unstationArmy(
          requestParameters["claimbuildName"],
          requestParameters["armyName"],
        );
        break;
      case "move":
        // Check if we're bound to an army and if yes fetch it
        if (characterInfo.boundTo) {
          requestParameters["armyName"] = characterInfo.boundTo;
          await MovementApiClient.moveArmyOrCompany(
            requestParameters["toRegion"],
            requestParameters["armyName"],
          );
        } else {
          await MovementApiClient.moveCharacter(requestParameters["toRegion"]);
        }
        break;
      case "bind":
        await ArmyControlApiClient.bindArmy(
          requestParameters["targetDiscordId"],
          requestParameters["armyName"],
        );
        break;
      case "unbind":
        requestParameters["armyName"] = characterInfo.boundTo;
        await ArmyControlApiClient.unbindArmy(
          requestParameters["targetDiscordId"],
          requestParameters["armyName"],
        );

        break;
      case "station":
        requestParameters["armyName"] = characterInfo.boundTo;
        await ArmyControlApiClient.stationArmy(
          requestParameters["claimbuildName"],
          requestParameters["armyName"],
        );
        break;

      case "unstation":
        requestParameters["armyName"] = characterInfo.boundTo;
        await ArmyControlApiClient.unstationArmy(
          requestParameters["claimbuildName"],
          requestParameters["armyName"],
        );
        break;
      default:
        ErrorHandler.throwError("Action was not found.");
        return;
    }
    // Show a success message
    AlertHandler.showSuccessAlert("Action submitted successfully.");
  }

  private static async getTargetDiscordId(
    playerInputs: PlayerActionInput[],
    isBind: boolean,
  ): Promise<string> {
    // Iterate through the playerInputs to find, calling the appropriate utility method to extract the targetDiscordId
    // from either a character name or an army name
    for (const input of playerInputs) {
      if (input.representedData === "targetCharacterName") {
        return await getDiscordIdFromCharacterName(input.selectedOption);
      } else if (
        input.representedData === "armyName" &&
        input.selectedOption !== "" &&
        !isBind
      ) {
        return await getPlayerBoundToArmy(input.selectedOption);
      }
    }
    return "Error";
  }
}
