import {localization} from "../../localization";
import {Notification} from "../../notifications";

export const main: Notification = {
  type: "error",
  title: localization.localize("mainApiErrorTitle"),
  message: localization.localize("mainApiErrorDescription")
};
