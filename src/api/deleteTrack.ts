export async function deleteTrack(id: string): Promise<void> {
  const res = await fetch(`http://localhost:8000/tracks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete track");
  }
}
