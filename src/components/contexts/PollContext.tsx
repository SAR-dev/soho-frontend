import { ChoicePostDataInterface } from "@interfaces/poll";
import { createContext } from "react";

interface ContextInterface {
    data: ChoicePostDataInterface;
    setData: (props: any) => void;
    totalVotes: number;
    setTotalVotes: (props: any) => void;
}
export const PollContext = createContext<ContextInterface | null>(null)