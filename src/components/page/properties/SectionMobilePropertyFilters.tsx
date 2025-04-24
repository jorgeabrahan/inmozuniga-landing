import { useStorePropertyFilters } from "src/stores/useStorePropertyFilters";
import SectionPropertyFilters from "./SectionPropertyFilters";
import { useEffect, useRef } from "react";
import CloseIcon from "@icons/CloseIcon";

export default function SectionMobilePropertyFilters() {
  const refFiltersBackground = useRef<HTMLSelectElement>(null);
  const refFiltersWrapper = useRef<HTMLDivElement>(null);
  const isShowingFilters = useStorePropertyFilters(
    (store) => store.isShowingFilters,
  );
  const setIsShowingFilters = useStorePropertyFilters(
    (store) => store.setIsShowingFilters,
  );
  useEffect(() => {
    const animationEndHandler = (e: AnimationEvent) => {
      if (!refFiltersWrapper.current || e.animationName !== "backdropFadeIn") {
        return;
      }
      refFiltersWrapper.current.classList.replace(
        "translate-y-full",
        "translate-y-0",
      );
    };
    if (isShowingFilters && refFiltersBackground.current) {
      refFiltersBackground.current.classList.add("bg-black/0");
      refFiltersBackground.current.classList.remove("backdrop-blur-sm");
      refFiltersBackground.current.addEventListener(
        "animationend",
        animationEndHandler,
      );
    }
    if (
      !isShowingFilters &&
      refFiltersBackground.current &&
      refFiltersWrapper.current
    ) {
      refFiltersBackground.current.removeEventListener(
        "animationend",
        animationEndHandler,
      );
      refFiltersWrapper.current.classList.remove("translate-y-0");
      refFiltersWrapper.current.classList.add("translate-y-full");
    }
    return () => {
      refFiltersBackground.current?.removeEventListener(
        "animationend",
        animationEndHandler,
      );
    };
  }, [isShowingFilters]);
  const handleClose = (
    e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>,
  ) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.hasAttribute("data-close-onclick")) {
      if (!refFiltersWrapper.current || !refFiltersBackground.current) return;
      const isClosed =
        refFiltersWrapper.current.classList.contains("translate-y-full");
      if (isClosed) {
        return;
      }
      refFiltersWrapper.current.classList.remove("translate-y-0");
      refFiltersWrapper.current.classList.add("translate-y-full");
      refFiltersBackground.current.classList.remove("bg-black/0");
      refFiltersBackground.current.classList.add(
        "bg-black/60",
        "backdrop-blur-sm",
      );
      refFiltersBackground.current.classList.add("backdrop-fade-out");
      // wait till the filters wrapper is translated outside of the screen
      setTimeout(() => {
        document.body.style.overflow = "";
        setIsShowingFilters(false);
      }, 900);
    }
  };
  return (
    <section
      className={`${isShowingFilters ? "grid backdrop-fade-in lgx:hidden" : "hidden"} fixed inset-0 bg-black/0 z-[350] items-end`}
      ref={refFiltersBackground}
      onClick={handleClose}
      data-close-onclick
    >
      <div
        className={`transition-transform duration-1000 delay-100 bg-white pt-6 pb-10 px-8 rounded-t-[52px] w-full max-h-screen overflow-y-auto`}
        ref={refFiltersWrapper}
      >
        <button
          className="flex items-center justify-center ml-auto mb-3 [&>*]:pointer-events-none"
          onClick={handleClose}
          data-close-onclick
        >
          <CloseIcon />
        </button>
        <SectionPropertyFilters afterSubmit={handleClose} />
      </div>
    </section>
  );
}
