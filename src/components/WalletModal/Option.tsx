import Image from "next/image";

const btnStyles =
  "px-5 py-2 cursor-pointer rounded-full text-darkOrange bg-darkOrange/10 font-medium text-sm hover:bg-darkOrange/25 duration-150";

export default function Option({
  onClick = null,
  icon,
  id,
  label,
}: {
  onClick?: null | (() => void);
  label: string;
  icon: string;
  id: string;
  active?: boolean;
}) {
  return (
    <div id={id} onClick={onClick || undefined} className={btnStyles}>
      <div className="flex flex-row justify-between items-center">
        <h5 className="text-lg font-medium text-defaultText">{label}</h5>
        <div className="w-8 h-8 flex justify-center items-center">
          <Image alt={label} src={icon} width={32} height={32} />
        </div>
      </div>
    </div>
  );
}
