interface Props {
  warning: string | undefined;
  touched: boolean | undefined;
}

export default function FormWarning({ warning, touched }: Props) {
  return (
    <>
      {warning && touched && (
        <div className="text-red-500 text-xs font-semibold shadow-xl">
          <span className="pr-1">•</span>
          {warning}
        </div>
      )}
    </>
  );
}
