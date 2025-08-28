import NavArrowDownIcon from "@icons/NavArrowDownIcon";
import Delimiter from "@layouts/Delimiter";
import { useEffect, useState, useMemo } from "react";
import { SecondaryButton } from "src/components/global/SecondaryButton";

const getFirstElements = (html: string, count = 1): string => {
  if (!html) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const children = Array.from(doc.body.children);
  const elementsToKeep = [];
  let countableElementsFound = 0;

  for (const child of children) {
    elementsToKeep.push(child);
    if (
      child.tagName.toLowerCase() !== "br" &&
      child.outerHTML.trim().toLowerCase() !== "<p><br></p>"
    ) {
      countableElementsFound++;
    }
    if (countableElementsFound >= count) {
      break;
    }
  }
  return elementsToKeep.map((el) => el.outerHTML).join("") || html;
};

export const PropertyDescription = ({
  description,
}: {
  description: string;
}) => {
  const [isShowingFullSizeDescription, setIsShowingFullSizeDescription] =
    useState(false);

  const previewDescription = useMemo(
    () => getFirstElements(description, 1),
    [description],
  );

  useEffect(() => {
    if (isShowingFullSizeDescription) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShowingFullSizeDescription]);

  const hasMoreContent = description.trim() !== previewDescription.trim();

  return (
    <>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: previewDescription,
        }}
      ></div>

      {hasMoreContent && (
        <SecondaryButton onClick={() => setIsShowingFullSizeDescription(true)}>
          Mostrar más
        </SecondaryButton>
      )}

      {isShowingFullSizeDescription && (
        <div className="fixed inset-0 bg-white z-[1000] lg:bg-black/85 overflow-y-auto lg:overflow-y-hidden pb-3 pt-20 lg:py-4 lg:grid lg:place-items-center">
          <div className="lg:bg-white lg:w-[768px] lg:mx-auto lg:h-[80%] lg:rounded-xl lg:py-10 lg:overflow-y-auto lg:relative">
            <SecondaryButton
              className="fixed top-3 lg:top-4 left-3 lg:right-4 lg:left-[unset]"
              onClick={() => setIsShowingFullSizeDescription(false)}
            >
              <NavArrowDownIcon size="20" className="rotate-90" />
              Regresar
            </SecondaryButton>
            <Delimiter>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
            </Delimiter>
          </div>
        </div>
      )}
    </>
  );
};
