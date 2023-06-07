export const convertSpacesToHyphens = (string) => {
  const regex = /\s/gi

  return string.toLowerCase().replace(regex, '-')
}
