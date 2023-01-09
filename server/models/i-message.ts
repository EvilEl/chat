import { model, Schema } from "mongoose";
interface IMessage {
  message: string;
  name: string;
  date: string;
}

const messageShema = new Schema<IMessage>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
});

const Message = model<IMessage>("Message", messageShema);

export { Message, IMessage };
