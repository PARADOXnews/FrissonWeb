"use client";

import { useParams } from "next/navigation";

export default function AlbumId() {
  const params = useParams();

  // console.log(params.id)
  return <div style={{ color: "white" }}>{params.id}</div>;
}
