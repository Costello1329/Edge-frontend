import Materialize from "materialize-css";



export interface Notification {
  type: "success" | "warning" | "error" | "message",
  title: string,
  message: string | null
};


class NotificationService {
  public notify (notification: Readonly<Notification>) {
    let notificationColor: string;
    let notificationColorText: string;

    switch (notification.type) {
      case "success":
        notificationColor = "green darken-3";
        notificationColorText = "white-text";
        break;
      case "warning":
        notificationColor = "yellow darken-1";
        notificationColorText = "black-text";
        break;
      case "error":
        notificationColor = "red darken-4";
        notificationColorText = "white-text";
        break;
      case "message":
        notificationColor = "grey darken-3"
        notificationColorText = "white-text";
        break;
    }

    const wordsCount: number =
      notification.title.split(" ").length +
      (notification.message === null ? 0 : notification.message.split(" ").length);

    Materialize.toast({
      html: `\
        <div class = "row" style = "margin: 0">
          <div class = "col s12 ${notificationColorText}">
            <h6>${notification.title.toUpperCase()}</h6>
            ${notification.message === null ? "" : `<p>${notification.message}</p>`}
          </div>
        </div>
      `,
      displayLength: Math.max(wordsCount * 200, 3000),
      classes: notificationColor
    });
  }
};


export const notifications = new NotificationService();
