export function formatDate(createdAt: any) {
  return createdAt.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}
