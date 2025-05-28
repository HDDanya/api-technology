import { SetStateAction } from 'shared/types';

interface ControlsProps {
  symbol: string;
  setSymbol: SetStateAction<string>;
}

export const Controls: React.FC<ControlsProps> = ({ symbol, setSymbol }) => (
  <div className="flex gap-4 p-4 justify-center">
    <input
      type="text"
      value={symbol}
      onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      className="border p-2 rounded"
      placeholder="Введите тикер"
    />
  </div>
);
