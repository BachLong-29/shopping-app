import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ReactNode } from "react";
import { useLanguage } from "@/core/context/LanguageContext";

interface IProps {
  trigger?: ReactNode | string;
  content: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  open?: boolean;
}

export function Confirmation({
  trigger,
  content,
  onConfirm,
  onCancel,
  open = false,
}: IProps) {
  const { t } = useLanguage();
  const alertProps = trigger ? {} : { open };
  return (
    <AlertDialog {...alertProps}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("modal.confirm")}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {t("modal.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t("modal.continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
