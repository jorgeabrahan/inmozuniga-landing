import NavArrowDownIcon from "@icons/NavArrowDownIcon";
import Delimiter from "@layouts/Delimiter";
import { useEffect, useState, useMemo } from "react";
import { SecondaryButton } from "src/components/global/SecondaryButton";

// Helper: obtiene el primer elemento/parrafo válido del HTML
const getFirstElement = (html: string): string => {
  if (!html) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const firstElement = doc.body.firstElementChild;
  return firstElement ? firstElement.outerHTML : html;
};

export const PropertyDescription = ({
  description,
}: {
  description: string;
}) => {
  const [isShowingFullSizeDescription, setIsShowingFullSizeDescription] =
    useState(false);

  // Memoriza el preview para no recalcular en cada render
  const previewDescription = useMemo(
    () => getFirstElement(description),
    [description],
  );

  // Evitar scroll cuando el modal está abierto
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
          <div className="lg:bg-white lg:max-w-3xl lg:mx-auto lg:h-[80%] lg:rounded-xl lg:py-10 lg:overflow-y-auto lg:relative">
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
