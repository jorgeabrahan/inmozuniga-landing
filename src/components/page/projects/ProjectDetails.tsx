import NavArrowDownIcon from "@icons/NavArrowDownIcon";
import type { TypeCosmicProject } from "@lib/types/Database";
import { useEffect, useState } from "react";
import { SecondaryButton } from "src/components/global/SecondaryButton";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const ProjectDetails = ({
  allProjects,
}: {
  allProjects: TypeCosmicProject[];
}) => {
  const [selectedProject, setSelectedProject] =
    useState<TypeCosmicProject | null>(null);
  useEffect(() => {
    const updateProjectFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const projectSlug = params.get("projectSlug");
      if (projectSlug && projectSlug.trim().length > 0) {
        const project = allProjects.find((p) => p.slug === projectSlug) ?? null;
        if (project != null) document.body.style.overflow = "hidden";
        setSelectedProject(project);
      } else {
        document.body.style.overflow = "";
        setSelectedProject(null);
      }
    };
    updateProjectFromUrl();
    window.addEventListener("locationchange", updateProjectFromUrl);
    return () => {
      window.removeEventListener("locationchange", updateProjectFromUrl);
    };
  }, [allProjects]);
  const handleGoBack = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("projectSlug");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setSelectedProject(null);
  };

  if (selectedProject == null) return;
  const projectImages = [
    selectedProject.thumbnail,
    ...selectedProject.metadata.images.map((item) => item.image.url),
  ];

  return (
    <div className="fixed inset-0 bg-black/85 z-[1000] flex items-center jusitfy-center px-3 lg:px-6 xl:px-8">
      <SecondaryButton
        className="fixed top-3 lg:top-4 left-3 lg:right-4 lg:left-[unset]"
        onClick={handleGoBack}
      >
        <NavArrowDownIcon size="20" className="rotate-90" />
        Regresar
      </SecondaryButton>
      <div className="bg-white w-full h-full max-w-[1300px] mx-auto max-h-[70%] md:max-h-[80%] rounded-xl md:grid grid-cols-12">
        <div className="h-1/2 md:h-full col-span-6 lg:col-span-7 xl:col-span-8">
          <Swiper
            cssMode={true}
            mousewheel={true}
            slidesPerView={1}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
            className="h-full w-full rounded-tl-xl rounded-tr-xl md:rounded-bl-xl md:rounded-tr-none overflow-hidden"
          >
            {projectImages.map((url) => (
              <SwiperSlide className="bg-black/80" key={url}>
                <img
                  className="h-full w-full object-cover md:object-contain xl:object-cover"
                  src={url}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-6 lg:col-span-5 xl:col-span-4 md:flex flex-col justify-center p-8 h-1/2 md:h-full overflow-y-auto">
          <h2 className="text-4xl font-semibold mb-6">
            {selectedProject.title}
          </h2>
          <div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: selectedProject.metadata.long_description,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
