import { RobotStateEnum } from './app/enums/robot-state.enum';

declare global {
    interface Window {
        setRobotInformation: React.Dispatch<React.SetStateAction<RobotStateEnum>>;
        setRobotName: React.Dispatch<React.SetStateAction<string>>;
        setRobotState: React.Dispatch<React.SetStateAction<RobotStateEnum>>; // Icon in header
        setBatteryLevel: React.Dispatch<React.SetStateAction<number>>; // Sets the battery level
        setLowBatteryLevel: React.Dispatch<React.SetStateAction<number>>; // Sets the low battery level threshold (bar color change)
    }
}