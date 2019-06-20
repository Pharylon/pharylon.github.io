// tslint:disable-next-line:interface-name
interface PushEvent extends Event {
  data: {
    text: () => string;
  };
}
