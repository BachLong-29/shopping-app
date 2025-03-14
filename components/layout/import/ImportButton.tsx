import { Download } from "lucide-react";

interface IProps {
  onClick: () => void;
}

const ImportButton = (props: IProps) => {
  return (
    <div className="flex items-center gap-4" onClick={props.onClick}>
      <Download size={15} /> Import
    </div>
  );
};

export default ImportButton;
