export const DIALOGS_INPUT = "DIALOGS_INPUT";

export function DialogAction(DialogsData) {
  return {
    type    : "DIALOGS_INPUT",
    payload : DialogsData,
  }
};