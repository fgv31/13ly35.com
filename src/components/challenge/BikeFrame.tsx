"use client";

export interface BikeFrameProps {
  src: string;
  alt: string;
  caption: string;
  mood: "naive" | "guided" | "honest";
}

const moodStyles: Record<
  BikeFrameProps["mood"],
  { border: string; captionClass: string }
> = {
  naive: {
    border: "border border-gray-200 opacity-80",
    captionClass: "text-gray-400",
  },
  guided: {
    border: "border border-gray-400",
    captionClass: "text-gray-600",
  },
  honest: {
    border: "border-2 border-indigo-500",
    captionClass: "text-indigo-600",
  },
};

export default function BikeFrame({ src, alt, caption, mood }: BikeFrameProps) {
  const { border, captionClass } = moodStyles[mood];

  return (
    <figure className="flex flex-col gap-2">
      <div className={`overflow-hidden rounded-md ${border}`}>
        <img
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
      <figcaption className={`text-sm ${captionClass}`}>{caption}</figcaption>
    </figure>
  );
}
