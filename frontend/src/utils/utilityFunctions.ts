export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then((r) => r);
}
