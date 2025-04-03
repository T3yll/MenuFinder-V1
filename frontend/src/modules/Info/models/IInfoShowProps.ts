import { IInfo } from "@/modules/Info/models/IInfo";

export interface InfoShowProps {
    info: IInfo;
    onClose: () => void;
  }
  