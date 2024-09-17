export function formatarData(data) {
  const novaData = new Date(data);
  novaData.setHours(novaData.getHours() + 3);
  return novaData.toLocaleDateString("pt-BR");
}
