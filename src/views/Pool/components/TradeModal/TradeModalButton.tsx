import { FC } from "react";
import { GoLinkExternal } from "react-icons/go";
import Image from "next/image";

const btnStyles =
  "px-5 py-2 justify-between items-center rounded-full text-darkOrange bg-darkOrange/10 font-medium text-sm hover:bg-darkOrange/25 duration-150 flex items-center justify-center gap-4 grow shrink-0";

export interface TradeModalButtonProps {
  name: string;
  alt: string;
  url: string;
  image: StaticImageData;
}

export const TradeModalButton: FC<TradeModalButtonProps> = ({
  name,
  alt,
  url,
  image
}) => {
  return (
    <div className="mt-8">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={btnStyles}
      >
        <div className="flex items-center">
          <Image
            src={image}
            alt={alt}
            width={20}
            height={20}
          />
          <span className="ml-4">{name}</span>
        </div>
        <GoLinkExternal size={18} />
      </a>
    </div>
  )
}