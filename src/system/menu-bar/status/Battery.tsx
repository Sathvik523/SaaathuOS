import { AppleBattery } from "@/shared/icons/apple";

export default function BatteryStatus() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[15px] font-medium">57%</span>
      <AppleBattery />
    </div>
  );
}