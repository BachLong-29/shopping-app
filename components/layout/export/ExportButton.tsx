import { Upload } from "lucide-react";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportExec: () => Promise<any>;
}

const ExportButton = (props: IProps) => {
  const { exportExec } = props;
  const handleExport = async () => {
    const response = await exportExec();
    const blob = new Blob([response], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-4" onClick={handleExport}>
      <Upload size={15} /> Export
    </div>
  );
};

export default ExportButton;
