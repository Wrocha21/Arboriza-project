import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../(public)/(map)/map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100px", width: "100px", background: "#f0f0f0" }}>
      Carregando mapa...
    </div>
  ),
});

export default function ModalMap() {
  return (
    <>
      <div className="container-modal">
        <div className="modal">
          <MapWithNoSSR />
        </div>
        <div className="box-back">
          <button>{"<"}</button>
        </div>
      </div>
    </>
  );
}
