export default function formatedResponse(
  message: string,
  data: Object,
  metadata: Object
) {
  const finalData = {
    ...data,
    message: message ? message : "No message provided",
  }
  const finalMetadata = { ...metadata }
  return { data: finalData, metadata: finalMetadata }
}
