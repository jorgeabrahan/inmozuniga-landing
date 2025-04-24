import Delimiter from "@layouts/Delimiter";

export default function SectionHeaderImage({
  img,
  tagline,
  title,
  className,
}: {
  img: {
    src: string;
    alt: string;
  };
  tagline: string;
  title: string;
  className?: string;
}) {
  return (
    <header
      className={`relative h-[350px] md:h-[450px] xl:h-[580px] ${className}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="h-[350px] md:h-[450px] xl:h-[580px] w-full object-cover absolute top-0 left-0 -z-10"
      />
      <div className="absolute inset-0 bg-black/60 -z-[5]" />
      <Delimiter className="text-white h-full flex flex-col justify-end">
        <p className="text-lg xl:text-2xl xl:mb-2">{tagline}</p>
        <h1 className="text-[52px] leading-[50px] xl:text-8xl xl:leading-[104px] mb-10">
          {title}
        </h1>
      </Delimiter>
    </header>
  );
}
