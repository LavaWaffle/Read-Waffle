export default function handleApiParameter(paramater: string | string[] | undefined) {
  if (paramater === undefined) {
    return "";
  }
  if (Array.isArray(paramater)) {
    return paramater[0] || "";
  }
  return paramater;
}